"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// রেফারেন্স অনুযায়ী POST /api/rentals
router.post('/', auth_1.authMiddleware, booking_controller_1.bookingController.createBookingIntoDB);
// রেফারেন্স অনুযায়ী PUT /api/rentals/return/:id
router.put('/return/:id', auth_1.authMiddleware, booking_controller_1.bookingController.returnVehicle);
exports.bookingRoutes = router; // Named Export
