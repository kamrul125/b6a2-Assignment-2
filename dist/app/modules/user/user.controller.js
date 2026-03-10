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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
exports.userController = {
    getAllUsers: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_service_1.userService.getAllUsers();
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200, // <--- এটি যোগ করা হয়েছে
            success: true,
            message: "All users retrieved",
            data: users
        });
    })),
    getSingleUser: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.userService.getSingleUser(Number(req.params.id));
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200, // <--- এটি যোগ করা হয়েছে
            success: true,
            message: "User retrieved",
            data: user
        });
    })),
    updateUser: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const currentUser = req.user;
        const updatedUser = yield user_service_1.userService.updateUser(Number(req.params.id), req.body, currentUser);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200, // <--- এটি যোগ করা হয়েছে
            success: true,
            message: "User updated",
            data: updatedUser
        });
    })),
    deleteUser: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const currentUser = req.user;
        yield user_service_1.userService.deleteUser(Number(req.params.id), currentUser);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200, // <--- এটি যোগ করা হয়েছে
            success: true,
            message: "User deleted",
            data: null // data প্রপার্টি পাঠাতে হবে কারণ ইন্টারফেসে আছে
        });
    })),
};
