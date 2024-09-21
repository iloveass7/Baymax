import express from 'express';
import { authenticate } from './../auth/verifyToken.js';
import { getCheckoutSession } from '../Controllers/bookingController.js';

const router = express.Router();

router.post('/checkout-session/:doctorId', getCheckoutSession);

export default router;
