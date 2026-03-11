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
    
    if (currentUser.role !== "ADMIN" && currentUser.id !== id) {
      throw new Error("You are not authorized to update this profile!");
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
    
  
    const isExist = await prisma.user.findUnique({ where: { id } });
    if (!isExist) throw new Error("User not found to delete!");

    await prisma.user.delete({ where: { id } });
  },
};