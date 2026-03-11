import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ১. বুকিং তৈরি করা
const createRentalIntoDB = async (payload: any, userId: number) => {
  const bike = await prisma.bike.findUnique({
    where: { id: payload.bikeId },
  });

  if (!bike) throw new Error('Bike not found!');
  if (!bike.isAvailable) throw new Error('This bike is already booked!');

  return await prisma.$transaction(async (tx) => {
    const newBooking = await tx.booking.create({
      data: {
        userId: userId,
        bikeId: payload.bikeId,
        startTime: new Date(payload.startTime),
      },
    });

    await tx.bike.update({
      where: { id: payload.bikeId },
      data: { isAvailable: false },
    });

    return newBooking;
  });
};

// ২. বাইক রিটার্ন করা
const returnVehicleInDB = async (bookingId: number, returnTime: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { bike: true } 
  });

  if (!booking) throw new Error("Booking record not found!");

  const startTime = new Date(booking.startTime);
  const endTime = new Date(returnTime);
  const diffInMs = endTime.getTime() - startTime.getTime();
  const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60)); 
  const totalCost = diffInHours * booking.bike.pricePerHour;

  return await prisma.$transaction(async (tx) => {
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        returnTime: endTime,
        totalCost: totalCost,
        isReturned: true 
      }
    });

    await tx.bike.update({
      where: { id: booking.bikeId },
      data: { isAvailable: true }
    });

    return updatedBooking;
  });
};

// --- নতুন যোগ করা ফাংশন (Requirement অনুযায়ী) ---
const getUserRentalsFromDB = async (userId: number) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: { bike: true }
  });
};

export const rentalService = {
  createRentalIntoDB,
  returnVehicleInDB,
  getUserRentalsFromDB 
};