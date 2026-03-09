import prisma from "../../config/prisma";
import bcrypt from "bcrypt";

export const userService = {
  getAllUsers: async () => {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  },

  getSingleUser: async (id: number) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) throw new Error("User not found");
    return user;
  },

  updateUser: async (id: number, data: any, currentUser: any) => {
    // Admin can update anyone, user can update self
    if (currentUser.role !== "ADMIN" && currentUser.id !== id) {
      throw new Error("Unauthorized");
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true },
    });

    return updated;
  },

  deleteUser: async (id: number, currentUser: any) => {
    if (currentUser.role !== "ADMIN") {
      throw new Error("Only admin can delete users");
    }
    await prisma.user.delete({ where: { id } });
  },
};