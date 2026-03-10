"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const vehicle_route_1 = __importDefault(require("../modules/vehicle/vehicle.route"));
const booking_route_1 = __importDefault(require("../modules/booking/booking.route"));
const router = (0, express_1.Router)();
// প্রতিটি মডিউলের জন্য আলাদা পাথ সেট করা হয়েছে
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.default
    },
    {
        path: '/vehicles',
        route: vehicle_route_1.default
    },
    {
        path: '/bookings',
        route: booking_route_1.default
    },
    {
        path: '/users',
        route: user_route_1.default
    },
];
// লুপের মাধ্যমে সব রাউট রেজিস্টার করা হচ্ছে
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
