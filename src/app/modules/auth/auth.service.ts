import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const register = async (data: any) => {
  // পাসওয়ার্ড হ্যাশ করা
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // রোলটি বড় হাতের অক্ষরে (ADMIN/USER) কনভার্ট করা
  const userRole = data.role ? data.role.toUpperCase() : "USER";

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: userRole as any, // Type safe করার জন্য
    },
  });

  return { 
    id: user.id, 
    name: user.name, 
    email: user.email, 
    role: user.role 
  };
};

const login = async (data: any) => {
  const user = await prisma.user.findUnique({ 
    where: { email: data.email } 
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // টোকেনে স্পষ্টভাবে ডাটা পাঠানো হচ্ছে
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
};

export const authService = { register, login };