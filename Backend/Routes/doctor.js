import express from 'express';
import { getSingleDoctor, getallDoctor, updateDoctor, deleteDoctor } from "../Controllers/doctorController.js";

const router = express.Router();

router.get('/:id', getSingleDoctor);
router.get('/', getallDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;