import express from 'express';
import { bookingController } from './booking.controller';
import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

// শুধু অ্যাডমিন বা অথরাইজড ইউজার এই এন্ডপয়েন্ট কল করতে পারবে
router.put('/return/:id', authMiddleware, bookingController.returnVehicle);

export default router;