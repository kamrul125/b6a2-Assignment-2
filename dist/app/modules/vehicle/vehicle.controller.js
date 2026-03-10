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
exports.vehicleController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const vehicle_service_1 = require("./vehicle.service");
// ১. বাইক তৈরি
const createVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vehicle_service_1.vehicleService.createVehicle(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Bike added successfully",
        data: result,
    });
}));
// ২. সব বাইক দেখা
const getAllVehicles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vehicle_service_1.vehicleService.getAllVehicles();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Bikes retrieved successfully",
        data: result,
    });
}));
// ৩. নির্দিষ্ট বাইক দেখা
const getSingleVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vehicle_service_1.vehicleService.getSingleVehicle(Number(req.params.id));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Bike retrieved successfully",
        data: result,
    });
}));
// ৪. বাইক আপডেট (এটি আপনার এরর দূর করবে)
const updateVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vehicle_service_1.vehicleService.updateVehicle(Number(req.params.id), req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Bike updated successfully",
        data: result,
    });
}));
// ৫. বাইক ডিলিট (এটিও আপনার এরর দূর করবে)
const deleteVehicle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vehicle_service_1.vehicleService.deleteVehicle(Number(req.params.id));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Bike deleted successfully",
        data: result,
    });
}));
// ৬. রেন্টাল ক্রিয়েট
const createRental = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    const { bikeId, startTime } = req.body;
    const result = yield vehicle_service_1.vehicleService.createRental(userId, bikeId, startTime);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Rental created successfully",
        data: result,
    });
}));
// ৭. রেন্টাল রিটার্ন
const returnRental = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vehicle_service_1.vehicleService.returnRental(Number(req.params.id));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Bike returned successfully",
        data: result,
    });
}));
// এই অবজেক্টে সব নাম থাকা বাধ্যতামূলক
exports.vehicleController = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle, // এখানে অ্যাড করা হলো
    deleteVehicle, // এখানে অ্যাড করা হলো
    createRental,
    returnRental,
};
