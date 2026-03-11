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
exports.authService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// ১. রেজিস্টার ফাংশন
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    return yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
    });
});
// ২. লগইন ফাংশন
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (!user)
        throw new Error("User not found");
    const isPasswordMatch = yield bcrypt_1.default.compare(data.password, user.password);
    if (!isPasswordMatch)
        throw new Error("Invalid password");
    // টোকেন পেলোড
    const jwtPayload = { id: user.id, role: user.role };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in || '7d'
    });
    return { token, user };
});
// ৩. প্রোফাইল গেট করার ফাংশন
const getProfileFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
});
// ৪. সকল ইউজার গেট করার ফাংশন
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
});
// ৫. প্রোফাইল আপডেট করার ফাংশন
const updateProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.update({
        where: { id },
        data,
    });
});
exports.authService = {
    register,
    login,
    getProfileFromDB,
    getAllUsers,
    updateProfile,
};
