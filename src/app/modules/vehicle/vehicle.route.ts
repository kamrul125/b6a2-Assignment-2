import { Router } from 'express';
import { vehicleController } from './vehicle.controller';
import { authMiddleware } from '../../middlewares/auth'; // মিডলওয়্যারটি ইমপোর্ট করুন

const router = Router();

// --- বাইক ম্যানেজমেন্ট (Admin/User CRUD) ---
router.post('/', vehicleController.createVehicle); 
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getSingleVehicle);
router.put('/:id', vehicleController.updateVehicle); 
router.delete('/:id', vehicleController.deleteVehicle);

// --- রেন্টাল ম্যানেজমেন্ট (অবশ্যই authMiddleware লাগবে) ---

// ভাড়া নেওয়া: POST /api/v1/vehicles/rentals
router.post('/rentals', authMiddleware, vehicleController.createRental); 

// ভাড়া ফেরত দেওয়া: PUT /api/v1/vehicles/rentals/:id/return
router.put('/rentals/:id/return', authMiddleware, vehicleController.returnRental);

export default router;