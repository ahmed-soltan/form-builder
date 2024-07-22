import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { formUrl: string } }
) => {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    const form = await prisma.form.update({
      where: {
        shareLink: params.formUrl,
        published: true,
      },
      data: {
        Submissions: {
          increment: 1,
        },
        formSubmission: {
          create: {
            ...body,
          },
        },
      },
    });

    return NextResponse.json({ form });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
