import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBikeIntoDB = async (payload: any) => {
  return await prisma.bike.create({
    data: {
      name: payload.name,
      description: payload.description,
      pricePerHour: payload.pricePerHour,
      isAvailable: payload.isAvailable ?? true,
      cc: payload.cc,
      model: payload.model,
      brand: payload.brand,
      year: payload.year, 
    },
  });
};

const getAllBikesFromDB = async () => {
  return await prisma.bike.findMany();
};

const updateBikeInDB = async (id: number, payload: Partial<any>) => {
  return await prisma.bike.update({
    where: { id },
    data: payload,
  });
};

const deleteBikeFromDB = async (id: number) => {
  return await prisma.bike.delete({
    where: { id },
  });
};

export const bikeService = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeInDB,
  deleteBikeFromDB,
};