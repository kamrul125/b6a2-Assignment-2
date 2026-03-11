import { Router } from 'express';

// আপনার ফোল্ডারের নাম bike, তাই পাথ হবে ../modules/bike/bike.route
import { bikeRoutes } from '../modules/bike/bike.route';
// আপনার ফোল্ডারের নাম Rental (R বড় হাতের), তাই পাথ হবে ../modules/Rental/rental.route
import { rentalRoutes } from '../modules/Rental/rental.route';
import { authRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    // রেফারেন্স অনুযায়ী ইউআরএল হবে /bikes
    path: '/bikes',
    route: bikeRoutes,
  },
  {
    // রেফারেন্স অনুযায়ী ইউআরএল হবে /rentals
    path: '/rentals',
    route: rentalRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;