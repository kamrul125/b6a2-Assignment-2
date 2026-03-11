import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding started...");

  // ১. অ্যাডমিন তৈরি করার লজিক
  const adminEmail = "admin@example.com";
  const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!adminExists) {
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedAdminPassword,
        role: Role.ADMIN, 
        phone: "01700000000",
        address: "Dhaka, Bangladesh",
      },
    });
    console.log("✅ Admin user created:", admin.email);
  } else {
    console.log("ℹ️ Admin user already exists");
  }

 
  const users = [
    { name: "Alice", email: "alice@example.com", password: "password123" },
    { name: "Bob", email: "bob@example.com", password: "password123" },
  ];

  for (const u of users) {
    const exists = await prisma.user.findUnique({ where: { email: u.email } });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: Role.USER,
        },
      });
      console.log(`✅ User created: ${u.email}`);
    }
  }

  
  const bikes = [
    {
      name: "Yamaha R15 V4",
      description: "Sporty look and great performance",
      pricePerHour: 150,
      isAvailable: true,
      brand: "Yamaha",
      model: "V4",
      cc: 155,
    },
    {
      name: "Royal Enfield Classic 350",
      description: "A legendary cruiser",
      pricePerHour: 200,
      isAvailable: true,
      brand: "Royal Enfield",
      model: "Classic 350",
      cc: 350,
    },
  ];

  for (const b of bikes) {

    const bikeExists = await prisma.bike.findFirst({ where: { name: b.name } });
    if (!bikeExists) {
      await prisma.bike.create({ data: b });
      console.log(`✅ Bike created: ${b.name}`);
    }
  }

  console.log("🏁 Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });