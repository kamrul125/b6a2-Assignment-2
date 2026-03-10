"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// বুকিং তৈরি (POST) - এটি না থাকলে 'Cannot POST' দেখাবে
router.post('/', auth_1.authMiddleware, booking_controller_1.bookingController.createBooking);
// বাইক রিটার্ন (PUT)
router.put('/return/:id', auth_1.authMiddleware, booking_controller_1.bookingController.returnVehicle);
exports.default = router;
