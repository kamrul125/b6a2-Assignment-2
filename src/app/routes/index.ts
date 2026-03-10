import { Router } from 'express';
import UserRoutes from '../modules/user/user.route';
import AuthRoutes from '../modules/auth/auth.route';
import VehicleRoutes from '../modules/vehicle/vehicle.route'; 
import BookingRoutes from '../modules/booking/booking.route'; 

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/vehicles', route: VehicleRoutes }, 
  { path: '/bookings', route: BookingRoutes }, 
  { path: '/users', route: UserRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;