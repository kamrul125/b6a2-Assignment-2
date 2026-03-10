import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const token = jwt.sign({ id: user.id, role: user.role }, "your_secret_key", { expiresIn: '1d' });
  return { token, user };
};

// ৩. প্রোফাইল গেট করার ফাংশন
const getProfileFromDB = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

// ৪. সকল ইউজার গেট করার ফাংশন (এটি আগে মিসিং ছিল)
const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

// ৫. প্রোফাইল আপডেট করার ফাংশন (এটিও আগে মিসিং ছিল)
const updateProfile = async (id: number, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// সবচেয়ে গুরুত্বপূর্ণ: এখানে নতুন ফাংশনগুলো যোগ করা হলো
export const authService = {
  register,
  login,
  getProfileFromDB,
  getAllUsers,    // এটি এখন কন্ট্রোলারের এরর দূর করবে
  updateProfile,  // এটিও এখন কন্ট্রোলারের এরর দূর করবে
};