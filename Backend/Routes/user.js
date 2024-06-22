import express from 'express';
import { getSingleUser, getallUser, updateUser, deleteUser } from "../Controllers/userController.js";
import {authnticate,restrict} from "..auth/verifyToken.js";


const router = express.Router();

router.get('/:id', authnticate,restrict(["patient"]),getSingleUser);
router.get('/', authnticate,restrict(["admin"]),getallUser);
router.put('/:id', authnticate,restrict(["patient"]),updateUser);
router.delete('/:id', authnticate,restrict(["patient"]),deleteUser);

export default router;
