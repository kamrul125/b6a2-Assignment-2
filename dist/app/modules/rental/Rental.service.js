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
exports.rentalService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// ১. বুকিং তৈরি করা
const createRentalIntoDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield prisma.bike.findUnique({
        where: { id: payload.bikeId },
    });
    if (!bike)
        throw new Error('Bike not found!');
    if (!bike.isAvailable)
        throw new Error('This bike is already booked!');
    return yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
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
});
// ২. বাইক রিটার্ন করা
const returnVehicleInDB = (bookingId, returnTime) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma.booking.findUnique({
        where: { id: bookingId },
        include: { bike: true }
    });
    if (!booking)
        throw new Error("Booking record not found!");
    const startTime = new Date(booking.startTime);
    const endTime = new Date(returnTime);
    const diffInMs = endTime.getTime() - startTime.getTime();
    const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
    const totalCost = diffInHours * booking.bike.pricePerHour;
    return yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBooking = yield tx.booking.update({
            where: { id: bookingId },
            data: {
                returnTime: endTime,
                totalCost: totalCost,
                isReturned: true
            }
        });
        yield tx.bike.update({
            where: { id: booking.bikeId },
            data: { isAvailable: true }
        });
        return updatedBooking;
    }));
});
// --- নতুন যোগ করা ফাংশন (Requirement অনুযায়ী) ---
const getUserRentalsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.booking.findMany({
        where: { userId },
        include: { bike: true }
    });
});
exports.rentalService = {
    createRentalIntoDB,
    returnVehicleInDB,
    getUserRentalsFromDB
};
