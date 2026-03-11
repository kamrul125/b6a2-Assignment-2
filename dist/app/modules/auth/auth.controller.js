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
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_validation_1 = require("./auth.validation");
exports.authController = {
    register: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const validatedData = auth_validation_1.registerSchema.parse(req.body);
        const user = yield auth_service_1.authService.register(validatedData);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: user,
        });
    })),
    login: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token, user } = yield auth_service_1.authService.login(req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "User logged in successfully",
            data: { token, data: user },
        });
    })),
    getProfile: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const user = req.user;
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "User profile retrieved successfully",
            data: user,
        });
    })),
    getAllUsers: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield auth_service_1.authService.getAllUsers();
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "All users retrieved",
            data: users,
        });
    })),
    updateProfile: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const userId = req.user.id;
        const updatedUser = yield auth_service_1.authService.updateProfile(userId, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "User updated",
            data: updatedUser,
        });
    })),
};
