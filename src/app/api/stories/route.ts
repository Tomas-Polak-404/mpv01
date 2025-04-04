
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { imageUrl, expiresAt } = body;

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const existingStory = await prisma.story.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingStory) {
      const updatedStory = await prisma.story.update({
        where: {
          userId: userId,
        },
        data: {
          img: imageUrl,
          expiresAt: expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
      return NextResponse.json(updatedStory);
    }

    const story = await prisma.story.create({
      data: {
        userId: userId,
        img: imageUrl, 
        expiresAt: expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error("[STORIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
