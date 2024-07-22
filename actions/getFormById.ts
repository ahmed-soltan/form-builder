import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export const getFormById = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const form = await prisma.form.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return form;
  } catch (error) {
    console.error("Error fetching form:", error);
    throw error;
  }
};
