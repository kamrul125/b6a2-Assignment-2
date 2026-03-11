"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const rental_controller_1 = require("./rental.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// ১. বাইক ভাড়া নেওয়া (বুকিং করা)
// POST /api/v1/rentals
router.post('/', auth_1.authMiddleware, rental_controller_1.rentalController.createRental);
// ২. বাইক রিটার্ন ও বিল জেনারেট করা (Admin Access)
// PUT /api/v1/rentals/return/:id
router.put('/return/:id', auth_1.authMiddleware, rental_controller_1.rentalController.returnVehicle);
// GET /api/v1/rentals/my-rentals
router.get('/my-rentals', auth_1.authMiddleware, rental_controller_1.rentalController.getMyRentals);
exports.rentalRoutes = router;
