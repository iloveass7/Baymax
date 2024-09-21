import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    try {
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(process.env.JWT_SECRET_KEY)
        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Middleware to restrict access based on roles
export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;

    try {
        // Attempt to find the user in both the User and Doctor collections
        const patient = await User.findById(userId);
        const doctor = await Doctor.findById(userId);

        let user = patient || doctor; // Assign user to patient or doctor if found

        // Check if the user exists and has a valid role
        if (!user || !roles.includes(user.role)) {
            return res.status(401).json({ success: false, message: 'You are not authorized' });
        }

        next(); // Allow the request to proceed
    } catch (err) {
        console.error('Error finding user:', err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
