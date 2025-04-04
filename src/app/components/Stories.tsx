// app/components/Stories.tsx
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: currentUserId },
  });

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        // Include the current user's own story
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-black border-[1px] border-gray-600 rounded-lg text-white overflow-x-auto scrollbar-hide">
      <div className="flex gap-8 w-max">
        <StoryList
          stories={stories}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default Stories;
