import { Router } from 'express';
// যদি ফাইল খুঁজে না পায়, তবে পাথগুলো আবার চেক করুন
import { authRoutes } from '../modules/auth/auth.route'; 
import { bikeRoutes } from '../modules/bike/bike.route';
import { rentalRoutes } from '../modules/rental/rental.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/bikes',
    route: bikeRoutes,
  },
  {
    path: '/rentals',
    route: rentalRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;