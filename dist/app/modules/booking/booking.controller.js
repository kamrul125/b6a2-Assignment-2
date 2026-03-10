"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const booking_service_1 = require("./booking.service");
/**
 * ১. নতুন বুকিং তৈরি করার কন্ট্রোলার (POST /api/v1/bookings)
 */
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // আপনার authMiddleware থেকে ইউজার আইডি নেওয়া (যদি req.user এ থাকে)
    // @ts-ignore
    const userId = req.user.id;
    const result = yield booking_service_1.bookingService.createBookingIntoDB(req.body, userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Rental created successfully",
        data: result,
    });
}));
/**
 * ২. রেন্টাল বা বাইক রিটার্ন করার কন্ট্রোলার (PUT /api/v1/bookings/return/:id)
 */
const returnVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { returnTime } = req.body;
    // সার্ভিস থেকে ক্যালকুলেশন এবং ডাটাবেজ আপডেট
    const result = yield booking_service_1.bookingService.returnVehicle(Number(id), returnTime);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Vehicle returned successfully",
        data: result,
    });
}));
exports.bookingController = {
    createBooking,
    returnVehicle,
};
