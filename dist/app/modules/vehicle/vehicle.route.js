"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = require("../../middlewares/auth"); // মিডলওয়্যারটি ইমপোর্ট করুন
const router = (0, express_1.Router)();
// --- বাইক ম্যানেজমেন্ট (Admin/User CRUD) ---
router.post('/', vehicle_controller_1.vehicleController.createVehicle);
router.get('/', vehicle_controller_1.vehicleController.getAllVehicles);
router.get('/:id', vehicle_controller_1.vehicleController.getSingleVehicle);
router.put('/:id', vehicle_controller_1.vehicleController.updateVehicle);
router.delete('/:id', vehicle_controller_1.vehicleController.deleteVehicle);
// --- রেন্টাল ম্যানেজমেন্ট (অবশ্যই authMiddleware লাগবে) ---
// ভাড়া নেওয়া: POST /api/v1/vehicles/rentals
router.post('/rentals', auth_1.authMiddleware, vehicle_controller_1.vehicleController.createRental);
// ভাড়া ফেরত দেওয়া: PUT /api/v1/vehicles/rentals/:id/return
router.put('/rentals/:id/return', auth_1.authMiddleware, vehicle_controller_1.vehicleController.returnRental);
exports.default = router;
