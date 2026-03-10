import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createVehicle = async (payload: any) => {
  return await prisma.bike.create({ data: payload });
};

const getAllVehicles = async () => {
  return await prisma.bike.findMany();
};

const getSingleVehicle = async (id: number) => {
  return await prisma.bike.findUnique({
    where: { id },
  });
};

const updateVehicle = async (id: number, payload: any) => {
  return await prisma.bike.update({
    where: { id },
    data: payload,
  });
};

const deleteVehicle = async (id: number) => {
  return await prisma.bike.delete({
    where: { id },
  });
};

export const vehicleService = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};