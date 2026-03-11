import express from 'express';
import { bikeController } from './bike.controller';
import { authMiddleware } from '../../middlewares/auth';

const router = express.Router();

// ১. বাইক তৈরি (Admin)
router.post('/', authMiddleware, bikeController.createBike);

// ২. সব বাইক দেখা (Public)
router.get('/', bikeController.getAllBikes);

// ৩. বাইক আপডেট (Admin)
router.put('/:id', authMiddleware, bikeController.updateBike);

// ৪. বাইক ডিলিট (Admin)
router.delete('/:id', authMiddleware, bikeController.deleteBike);

export const bikeRoutes = router;