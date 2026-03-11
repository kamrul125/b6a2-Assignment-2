"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post('/', auth_1.authMiddleware, vehicle_controller_1.vehicleController.createVehicle);
router.get('/', vehicle_controller_1.vehicleController.getAllVehicles);
router.get('/:id', vehicle_controller_1.vehicleController.getSingleVehicle);
router.put('/:id', auth_1.authMiddleware, vehicle_controller_1.vehicleController.updateVehicle);
router.delete('/:id', auth_1.authMiddleware, vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicleRoutes = router; // Named Export
