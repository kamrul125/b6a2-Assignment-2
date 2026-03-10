import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * ১. নতুন বুকিং তৈরি করার সার্ভিস (POST /api/v1/bookings)
 */
const createBookingIntoDB = async (payload: any, userId: number) => {
  // বাইকটি খুঁজে দেখা এবং এটি এভেইল্যাবল কি না চেক করা
  const bike = await prisma.bike.findUnique({
    where: { id: payload.bikeId },
  });

  if (!bike) {
    throw new Error('Bike not found!');
  }

  if (!bike.isAvailable) {
    throw new Error('This bike is already booked!');
  }

  // ট্রানজ্যাকশন: বুকিং তৈরি + বাইকের স্ট্যাটাস false করা
  const result = await prisma.$transaction(async (tx) => {
    // rental এর বদলে এখন হবে booking
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

  return result;
};

/**
 * ২. বাইক রিটার্ন এবং কস্ট ক্যালকুলেশন সার্ভিস (PUT /api/v1/bookings/return/:id)
 */
const returnVehicle = async (bookingId: number, returnTime: string) => {
  // ১. বুকিং রেকর্ডটি খুঁজে বের করা (rental -> booking)
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { bike: true } 
  });

  if (!booking) throw new Error("Booking record not found!");

  // ২. সময় এবং কস্ট ক্যালকুলেশন
  const startTime = new Date(booking.startTime);
  const endTime = new Date(returnTime);

  const diffInMs = endTime.getTime() - startTime.getTime();
  const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60)); 
  
  const totalCost = diffInHours * booking.bike.pricePerHour;

  // ৩. ট্রানজ্যাকশন: বুকিং আপডেট + বাইক এভেইলেবল করা
  const result = await prisma.$transaction(async (tx) => {
    // rental -> booking
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        returnTime: endTime,
        totalCost: totalCost,
        isReturned: true // এটি যোগ করা ভালো যাতে বোঝা যায় রিটার্ন হয়েছে
      }
    });

    await tx.bike.update({
      where: { id: booking.bikeId },
      data: { isAvailable: true }
    });

    return updatedBooking;
  });

  return result;
};

/**
 * ৩. সব বুকিং দেখার সার্ভিস (Admin এর জন্য)
 */
const getAllBookingsFromDB = async () => {
  // rental -> booking
  return await prisma.booking.findMany({
    include: {
      user: true,
      bike: true,
    },
  });
};

export const bookingService = {
  createBookingIntoDB,
  returnVehicle,
  getAllBookingsFromDB
};