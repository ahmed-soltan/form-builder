import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export const getFormContentByUrl = async (url: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // First, find the form by shareLink
    const form = await prisma.form.findFirst({
      where: {
        shareLink: url,
      },
      select: {
        id: true,
        content: true,
      },
    });

    if (!form) {
      throw new Error("Form not found");
    }

    // Then, update the form's visits count using its unique id
    await prisma.form.update({
      where: {
        id: form.id,
      },
      data: {
        visits: {
          increment: 1,
        },
      },
    });

    return form;
  } catch (error) {
    console.error("Error fetching form:", error);
    throw error;
  }
};
