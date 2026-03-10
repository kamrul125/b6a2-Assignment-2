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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config")); // config ফাইলটি ইমপোর্ট করুন
exports.authMiddleware = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    // ১. টোকেন আছে কি না চেক করা
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'You are not authorized! Please provide a valid token.',
        });
    }
    const token = authHeader.split(' ')[1];
    // ২. টোকেন ভেরিফাই করা
    try {
        // এখানে config.jwt_access_secret ব্যবহার করুন যা আপনার .env এর সাথে মিলবে
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        // ৩. ডিকোড করা ডাটা রিকোয়েস্টে রাখা
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access! Invalid or expired token.',
        });
    }
}));
