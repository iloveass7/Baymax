import express from 'express';
import { getAllReviews,createReview } from '../Controllers/reviewController';
import {authnticate,restrict} from "..auth/verifyToken.js";

const router = express.Router({mergeParams: true});
router.route('/'.getAllReviews.post(authnticate, restrict(["patient"]), createReview));

export default router;