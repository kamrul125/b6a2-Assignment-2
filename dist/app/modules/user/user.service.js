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
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userService = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return prisma_1.default.user.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });
    }),
    getSingleUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });
        if (!user)
            throw new Error("User not found");
        return user;
    }),
    updateUser: (id, data, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentUser.role !== "ADMIN" && currentUser.id !== id) {
            throw new Error("You are not authorized to update this profile!");
        }
        if (data.password) {
            data.password = yield bcrypt_1.default.hash(data.password, 10);
        }
        const updated = yield prisma_1.default.user.update({
            where: { id },
            data,
            select: { id: true, name: true, email: true, role: true },
        });
        return updated;
    }),
    deleteUser: (id, currentUser) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentUser.role !== "ADMIN") {
            throw new Error("Only admin can delete users");
        }
        const isExist = yield prisma_1.default.user.findUnique({ where: { id } });
        if (!isExist)
            throw new Error("User not found to delete!");
        yield prisma_1.default.user.delete({ where: { id } });
    }),
};
