import express from 'express';
import { getSingleDoctor, getallDoctor, updateDoctor, deleteDoctor } from "../Controllers/doctorController.js";
import {authnticate,restrict} from "..auth/verifyToken.js";
import reviewRouter from "./reviewRouter.js";
const router = express.Router();
//nester router
router.use('/:doctorId/reviews', reviewRouter);

router.get('/:id', getSingleDoctor);
router.get('/', getallDoctor);
router.put('/:id',authnticate,restrict(["doctor"]), updateDoctor);
router.delete('/:id',authnticate,restrict(["doctor"]), deleteDoctor);

export default router;