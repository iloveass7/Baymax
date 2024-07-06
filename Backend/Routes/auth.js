
import express from "express";
import { register, login, test } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/test', test);

export default router;
