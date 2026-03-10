import { Router } from 'express';
import UserRoutes from '../modules/user/user.route';
import AuthRoutes from '../modules/auth/auth.route';
import VehicleRoutes from '../modules/vehicle/vehicle.route'; 
import BookingRoutes from '../modules/booking/booking.route'; 

const router = Router();

// প্রতিটি মডিউলের জন্য আলাদা পাথ সেট করা হয়েছে
const moduleRoutes = [
  { 
    path: '/auth', 
    route: AuthRoutes 
  },
  { 
    path: '/vehicles', 
    route: VehicleRoutes 
  }, 
  { 
    path: '/bookings', 
    route: BookingRoutes 
  }, 
  { 
    path: '/users', 
    route: UserRoutes 
  },
];

// লুপের মাধ্যমে সব রাউট রেজিস্টার করা হচ্ছে
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;