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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * ১. নতুন বুকিং তৈরি করার সার্ভিস (POST /api/v1/bookings)
 */
const createBookingIntoDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // বাইকটি খুঁজে দেখা এবং এটি এভেইল্যাবল কি না চেক করা
    const bike = yield prisma.bike.findUnique({
        where: { id: payload.bikeId },
    });
    if (!bike) {
        throw new Error('Bike not found!');
    }
    if (!bike.isAvailable) {
        throw new Error('This bike is already booked!');
    }
    // ট্রানজ্যাকশন: বুকিং তৈরি + বাইকের স্ট্যাটাস false করা
    const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // rental এর বদলে এখন হবে booking
        const newBooking = yield tx.booking.create({
            data: {
                userId: userId,
                bikeId: payload.bikeId,
                startTime: new Date(payload.startTime),
            },
        });
        yield tx.bike.update({
            where: { id: payload.bikeId },
            data: { isAvailable: false },
        });
        return newBooking;
    }));
    return result;
});
/**
 * ২. বাইক রিটার্ন এবং কস্ট ক্যালকুলেশন সার্ভিস (PUT /api/v1/bookings/return/:id)
 */
const returnVehicle = (bookingId, returnTime) => __awaiter(void 0, void 0, void 0, function* () {
    // ১. বুকিং রেকর্ডটি খুঁজে বের করা (rental -> booking)
    const booking = yield prisma.booking.findUnique({
        where: { id: bookingId },
        include: { bike: true }
    });
    if (!booking)
        throw new Error("Booking record not found!");
    // ২. সময় এবং কস্ট ক্যালকুলেশন
    const startTime = new Date(booking.startTime);
    const endTime = new Date(returnTime);
    const diffInMs = endTime.getTime() - startTime.getTime();
    const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
    const totalCost = diffInHours * booking.bike.pricePerHour;
    // ৩. ট্রানজ্যাকশন: বুকিং আপডেট + বাইক এভেইলেবল করা
    const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // rental -> booking
        const updatedBooking = yield tx.booking.update({
            where: { id: bookingId },
            data: {
                returnTime: endTime,
                totalCost: totalCost,
                isReturned: true // এটি যোগ করা ভালো যাতে বোঝা যায় রিটার্ন হয়েছে
            }
        });
        yield tx.bike.update({
            where: { id: booking.bikeId },
            data: { isAvailable: true }
        });
        return updatedBooking;
    }));
    return result;
});
/**
 * ৩. সব বুকিং দেখার সার্ভিস (Admin এর জন্য)
 */
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // rental -> booking
    return yield prisma.booking.findMany({
        include: {
            user: true,
            bike: true,
        },
    });
});
exports.bookingService = {
    createBookingIntoDB,
    returnVehicle,
    getAllBookingsFromDB
};
