import express from 'express';
import { rentalController } from './rental.controller'; 
import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

// ১. বাইক ভাড়া নেওয়া (বুকিং করা)
// POST /api/v1/rentals
router.post('/', authMiddleware, rentalController.createRental);

// ২. বাইক রিটার্ন ও বিল জেনারেট করা (Admin Access)
// PUT /api/v1/rentals/return/:id
router.put('/return/:id', authMiddleware, rentalController.returnVehicle);


// GET /api/v1/rentals/my-rentals
router.get('/my-rentals', authMiddleware, rentalController.getMyRentals);

export const rentalRoutes = router;