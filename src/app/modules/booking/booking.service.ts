import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const returnVehicle = async (rentalId: number, returnTime: string) => {
  // ১. রেন্টাল রেকর্ড এবং বাইকের তথ্য আনা
  const rentalData = await prisma.rental.findUnique({
    where: { id: rentalId },
    include: { bike: true },
  });

  if (!rentalData) {
    throw new Error("Rental record not found!");
  }

  // ২. সময় এবং খরচ ক্যালকুলেশন
  const startTime = new Date(rentalData.startTime);
  const endTime = new Date(returnTime);

  const durationInMs = endTime.getTime() - startTime.getTime();
  const durationInHours = durationInMs / (1000 * 60 * 60);

  const totalCost = Math.ceil(durationInHours * rentalData.bike.pricePerHour);

  // ৩. ট্রানজ্যাকশন (অ্যাটমিক অপারেশন)
  const result = await prisma.$transaction(async (tx) => {
    // রেন্টাল আপডেট
    const updatedRental = await tx.rental.update({
      where: { id: rentalId },
      data: {
        returnTime: endTime,
        totalCost: totalCost,
        isReturned: true,
      },
    });

    // বাইক এভেইলেবিলিটি আপডেট
    await tx.bike.update({
      where: { id: rentalData.bikeId },
      data: { isAvailable: true },
    });

    return updatedRental;
  });

  return result;
};

// এই এক্সপোর্ট নামটি কন্ট্রোলারে ব্যবহার করুন
export const bookingService = {
  returnVehicle,
};