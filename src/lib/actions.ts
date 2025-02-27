"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }
  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });

      if (existingBlock) {
        await prisma.block.delete({
          where: {
            id: existingBlock.id,
          },
        });
      } else {
        await prisma.block.create({
          data: {
            blockerId: currentUserId,
            blockedId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  try {
    if (!currentUserId) {
      throw new Error("User is not authenticated!");
    }

    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  try {
    if (!currentUserId) {
      throw new Error("User is not authenticated!");
    }

    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  console.log(fields);

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return { success: false, error: true };
  }

  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId,
      commentId: null, // Zajišťujeme, že pracujeme pouze s post liky
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  revalidatePath("/");
};

export const addComment = async (postId: number, desc: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

const postSchema = z.object({
  desc: z.string().min(1).max(280),
  img: z
    .string()
    .transform((value) => (value === "null" ? null : value))
    .nullable()
    .optional(),
});


export const addPost = async (
  prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> => {
  try {
    // Získání dat z formData
    const rawData = {
      desc: formData.get("desc") as string,
      img: formData.get("img") as string,
    };

    // Validace
    const validatedData = postSchema.parse(rawData);

    // Autentizace
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Vytvoření příspěvku upravte na:
    await prisma.post.create({
      data: {
        desc: validatedData.desc,
        userId,
        img: validatedData.img === "null" ? null : validatedData.img,
      },
    });

    revalidatePath("/");
    return { error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Post must be between 1-280 characters" };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Unknown error occurred" };
  }
};


export const deletePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error)
  }
};


export const addStory = async (img: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }
    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (err) {
    console.log(err);
  }
};

export const getPostById = async (id: string) => {
  const numericId = parseInt(id, 10); // převod string na number
  if (isNaN(numericId)) {
    throw new Error("Invalid post id");
  }

  return await prisma.post.findUnique({
    where: { id: numericId },
    include: {
      user: true,
      likes: true,
      _count: {
        select: { comments: true },
      },
    },
  });
};
