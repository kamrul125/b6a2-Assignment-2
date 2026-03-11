import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

// ১. রেজিস্টার ফাংশন
const register = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
};

// ২. লগইন ফাংশন
const login = async (data: any) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("User not found");

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid password");

  // টোকেন পেলোড
  const jwtPayload = { id: user.id, role: user.role };

  
  const token = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    { 
      expiresIn: (config.jwt_access_expires_in as any) || '7d' 
    }
  );

  return { token, user };
};

// ৩. প্রোফাইল গেট করার ফাংশন
const getProfileFromDB = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

// ৪. সকল ইউজার গেট করার ফাংশন
const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

// ৫. প্রোফাইল আপডেট করার ফাংশন
const updateProfile = async (id: number, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const authService = {
  register,
  login,
  getProfileFromDB,
  getAllUsers,
  updateProfile,
};