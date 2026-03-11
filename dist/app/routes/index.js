"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// আপনার ফোল্ডারের নাম bike, তাই পাথ হবে ../modules/bike/bike.route
const bike_route_1 = require("../modules/bike/bike.route");
// আপনার ফোল্ডারের নাম Rental (R বড় হাতের), তাই পাথ হবে ../modules/Rental/rental.route
const rental_route_1 = require("../modules/rental/rental.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        // রেফারেন্স অনুযায়ী ইউআরএল হবে /bikes
        path: '/bikes',
        route: bike_route_1.bikeRoutes,
    },
    {
        // রেফারেন্স অনুযায়ী ইউআরএল হবে /rentals
        path: '/rentals',
        route: rental_route_1.rentalRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
