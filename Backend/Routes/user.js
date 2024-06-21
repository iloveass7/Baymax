import express from 'express';
import { getSingleUser, getallUser, updateUser, deleteUser } from "../Controllers/userController.js";

const router = express.Router();

router.get('/:id', getSingleUser);
router.get('/', getallUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;