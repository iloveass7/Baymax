import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
    //get token from header
    const authToken = req.headers.authorization
    if(!authToken || authToken.startsWith('Bearer ')){
        return res.status(401).json({ success: false, message: "Authorization denied." });
    }
    try{
        const token = authToken.split(' ')[1];
        const decoded = jwt.verufy(token,process.env.JWT_SECRET_KEY);
        req.userId=decoded.id;
        req.role=decoded.role;
        next();
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({ success: false, message: "Token expired." });
        }
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
}

export const restict = async (req, res, next) => {
    const userId = req.userId;
    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
    if(patient){
        user=patient;
    }else{
        user=doctor;
    }
    if(!removeEventListener.includes(user.role)){
        return res.status(401).json({ success: false, message: "Unauthorized access." });
    }
    next();
}