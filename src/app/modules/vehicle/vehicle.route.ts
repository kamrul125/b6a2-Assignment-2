import { Router } from 'express';
import { vehicleController } from './vehicle.controller';

const router = Router();

router.post('/', vehicleController.createVehicle);

// export const vehicleRoutes = router; <-- এটি কেটে নিচের লাইনটি দিন
export default router;