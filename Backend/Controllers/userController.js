import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Update request for user ID:", id);
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ success: false, message: "Failed to update." });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Delete request for user ID:", id);
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ success: false, message: "Failed to delete." });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Get request for user ID:", id);
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "No user found with that ID." });
        }
        res.status(200).json({ success: true, message: "User found successfully", data: user });
    } catch (err) {
        console.error("Get single user error:", err);
        res.status(500).json({ success: false, message: "Failed to retrieve user." });
    }
};

export const getallUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, message: "Users found successfully", data: users });
    } catch (err) {
        console.error("Get all users error:", err);
        res.status(500).json({ success: false, message: "Failed to retrieve users." });
    }
};
