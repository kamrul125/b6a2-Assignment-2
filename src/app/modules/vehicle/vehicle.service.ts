import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Bike CRUD Part ---
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

// --- Booking Management Part (Updated from Rental to Booking) ---

// ১. বুকিং তৈরি করা (ভাড়া দেওয়া)
const createRental = async (userId: number, bikeId: number, startTime: string) => {
  return await prisma.$transaction(async (tx) => {
    // বাইকের স্ট্যাটাস চেক এবং আপডেট (isAvailable = false)
    await tx.bike.update({
      where: { id: bikeId },
      data: { isAvailable: false },
    });

    // বুকিং রেকর্ড তৈরি (এখন prisma.booking ব্যবহার হবে)
    return await tx.booking.create({
      data: {
        userId,
        bikeId,
        startTime: new Date(startTime),
      },
    });
  });
};

// ২. বুকিং রিটার্ন (টাকা ক্যালকুলেশন লজিক)
const returnRental = async (bookingId: number) => {
  // প্রিজমা এখন 'booking' মডেল ব্যবহার করবে
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { bike: true },
  });

  if (!booking) throw new Error("Booking record not found!");

  const returnTime = new Date();
  const startTime = new Date(booking.startTime);

  // ঘণ্টার পার্থক্য বের করা
  const diffInMs = returnTime.getTime() - startTime.getTime();
  const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60)); 

  const totalCost = diffInHours * booking.bike.pricePerHour;

  return await prisma.$transaction(async (tx) => {
    // বাইক আবার এভেইল্যাবল করা
    await tx.bike.update({
      where: { id: booking.bikeId },
      data: { isAvailable: true },
    });

    // বুকিং রেকর্ড আপডেট
    return await tx.booking.update({
      where: { id: bookingId },
      data: {
        returnTime,
        totalCost,
        isReturned: true,
      },
    });
  });
};

export const vehicleService = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
  createRental,  
  returnRental,  
};