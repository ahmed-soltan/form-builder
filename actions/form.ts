import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prismadb";

export const getFormStates = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const states = await prisma.form.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        visits: true,
        Submissions: true,
      },
    });

    const visits = states._sum.visits || 0;
    const submissions = states._sum.Submissions || 0;

    let submissionsRate = 0;
    if (visits > 0) {
      submissionsRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionsRate;

    return { visits, submissions, submissionsRate, bounceRate };
  } catch (error) {
    console.error("Error fetching form states:", error);
    throw error;
  }
};

