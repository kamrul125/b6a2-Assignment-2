import { Router } from 'express';
import { bikeRoutes } from '../modules/bike/bike.route';
import { rentalRoutes } from '../modules/rental/rental.route';
import { authRoutes } from '../modules/auth/auth.route';

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