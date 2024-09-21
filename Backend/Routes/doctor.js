import express from 'express';
import { getSingleDoctor, getallDoctor, updateDoctor, deleteDoctor, getDoctorProfile } from '../Controllers/doctorController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
import reviewRouter from './review.js';

const router = express.Router();

router.use('/:doctorId/reviews', reviewRouter);

router.get('/:id', getSingleDoctor);
router.get('/', getallDoctor);
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id', authenticate, deleteDoctor);
router.get('/profile/me', authenticate, restrict(['doctor']), getDoctorProfile);
export default router;
