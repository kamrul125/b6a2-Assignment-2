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
exports.vehicleService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// --- Bike CRUD Part ---
const createVehicle = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bike.create({ data: payload });
});
const getAllVehicles = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bike.findMany();
});
const getSingleVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bike.findUnique({
        where: { id },
    });
});
const updateVehicle = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bike.update({
        where: { id },
        data: payload,
    });
});
const deleteVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.bike.delete({
        where: { id },
    });
});
// --- Booking Management Part (Updated from Rental to Booking) ---
// ১. বুকিং তৈরি করা (ভাড়া দেওয়া)
const createRental = (userId, bikeId, startTime) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // বাইকের স্ট্যাটাস চেক এবং আপডেট (isAvailable = false)
        yield tx.bike.update({
            where: { id: bikeId },
            data: { isAvailable: false },
        });
        // বুকিং রেকর্ড তৈরি (এখন prisma.booking ব্যবহার হবে)
        return yield tx.booking.create({
            data: {
                userId,
                bikeId,
                startTime: new Date(startTime),
            },
        });
    }));
});
// ২. বুকিং রিটার্ন (টাকা ক্যালকুলেশন লজিক)
const returnRental = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    // প্রিজমা এখন 'booking' মডেল ব্যবহার করবে
    const booking = yield prisma.booking.findUnique({
        where: { id: bookingId },
        include: { bike: true },
    });
    if (!booking)
        throw new Error("Booking record not found!");
    const returnTime = new Date();
    const startTime = new Date(booking.startTime);
    // ঘণ্টার পার্থক্য বের করা
    const diffInMs = returnTime.getTime() - startTime.getTime();
    const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
    const totalCost = diffInHours * booking.bike.pricePerHour;
    return yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // বাইক আবার এভেইল্যাবল করা
        yield tx.bike.update({
            where: { id: booking.bikeId },
            data: { isAvailable: true },
        });
        // বুকিং রেকর্ড আপডেট
        return yield tx.booking.update({
            where: { id: bookingId },
            data: {
                returnTime,
                totalCost,
                isReturned: true,
            },
        });
    }));
});
exports.vehicleService = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
    createRental,
    returnRental,
};
