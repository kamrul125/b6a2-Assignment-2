import { Router } from 'express';
import UserRoutes from '../modules/user/user.route'; // { } সরিয়ে ফেলা হয়েছে
import AuthRoutes from '../modules/auth/auth.route'; // { } সরিয়ে ফেলা হয়েছে

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;