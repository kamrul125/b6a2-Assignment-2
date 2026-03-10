import express from 'express';
import { bookingController } from './booking.controller';
import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

// বুকিং তৈরি (POST) - এটি না থাকলে 'Cannot POST' দেখাবে
router.post('/', authMiddleware, bookingController.createBooking);

// বাইক রিটার্ন (PUT)
router.put('/return/:id', authMiddleware, bookingController.returnVehicle);

export default router;