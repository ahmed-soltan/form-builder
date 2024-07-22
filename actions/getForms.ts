import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export const getForms = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const forms = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return forms;
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw error;
  }
};


