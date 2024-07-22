import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { formId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const body = await req.json();

    if (!body) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    const form = await prisma.form.update({
      where: {
        id: parseInt(params.formId),
        userId: userId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json({ form });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { formId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    await prisma.form.delete({
      where: {
        id: parseInt(params.formId),
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 500 });
  }
};
