"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// ১. বাইক তৈরি (Admin)
router.post('/', auth_1.authMiddleware, bike_controller_1.bikeController.createBike);
// ২. সব বাইক দেখা (Public)
router.get('/', bike_controller_1.bikeController.getAllBikes);
// ৩. বাইক আপডেট (Admin)
router.put('/:id', auth_1.authMiddleware, bike_controller_1.bikeController.updateBike);
// ৪. বাইক ডিলিট (Admin)
router.delete('/:id', auth_1.authMiddleware, bike_controller_1.bikeController.deleteBike);
exports.bikeRoutes = router;
