"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bike_route_1 = require("../modules/bike/bike.route");
const rental_route_1 = require("../modules/rental/rental.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/bikes',
        route: bike_route_1.bikeRoutes,
    },
    {
        path: '/rentals',
        route: rental_route_1.rentalRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
