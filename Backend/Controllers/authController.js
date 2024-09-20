import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
    })
}
const generateRefresh = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_SECRET_KEY, {
        expiresIn: "69d",
    })
}

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') {
            user = new User({ name, email, password: hashedPassword, photo, gender, role });
        }
        if (role === 'doctor') {
            user = new Doctor({ name, email, password: hashedPassword, photo, gender, role });
        }

        await user.save();
        res.status(200).json({ sucess: true, message: "User registered successfully" });
    } catch (err) {
        res.status(500).send("Error registering user: " + err.message);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body; 
    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
        
        if (patient) user = patient;
        if (doctor) user = doctor;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password); 
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }

        const token = generateToken(user);
        const refreshtoken = generateRefresh(user);
        //console.log(refreshtoken);

        const { password: userPassword, role, appointments, ...rest } = user._doc; 

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            refreshtoken,
            data: { ...rest },
            role
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Error logging in user: " + err.message });

    }
};
