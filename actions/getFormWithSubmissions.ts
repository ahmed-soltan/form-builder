import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export const getFormWithSubmissions = async (id: number) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const form = await prisma.form.findFirst({
      where: {
        id,
      },
      include:{
        formSubmission:true
      }
    });

    if (!form) {
      throw new Error("Form not found");
    }

    return form;
  } catch (error) {
    console.error("Error fetching form:", error);
    throw error;
  }
};
