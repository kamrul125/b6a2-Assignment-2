import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

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
        role: "ADMIN",
      },
    });
    console.log("✅ Admin user created:", admin.email);
  } else {
    console.log("ℹ️ Admin user already exists");
  }

  // ২. সাধারণ ইউজারদের লিস্ট
  const users = [
    { name: "Alice", email: "alice@example.com", password: "password123" },
    { name: "Bob", email: "bob@example.com", password: "password123" },
  ];

  // ৩. লুপ চালিয়ে ইউজার তৈরি করা
  for (const u of users) {
    const exists = await prisma.user.findUnique({ where: { email: u.email } });
    
    if (!exists) {
      const hashedUserPassword = await bcrypt.hash(u.password, 10);
      await prisma.user.create({
        data: {
          name: u.name,
          email: u.email,
          password: hashedUserPassword,
          role: "USER",
        },
      });
      console.log(`✅ User created: ${u.email}`);
    } else {
      console.log(`ℹ️ User already exists: ${u.email}`);
    }
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });