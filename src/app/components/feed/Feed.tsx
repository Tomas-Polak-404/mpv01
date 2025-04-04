import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();

  let posts: any[] = [];

  if (username) {
    const targetUser = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        isPrivate: true,
      },
    });

    if (!targetUser) {
      return (
        <div className="p-4 bg-black text-white rounded-lg border-[1px] border-gray-600">
          User not found
        </div>
      );
    }

    if (targetUser.isPrivate && userId && targetUser.id !== userId) {
      const isFollowing = await prisma.follower.findFirst({
        where: {
          followerId: userId,
          followingId: targetUser.id,
        },
      });

      if (!isFollowing) {
        return (
          <div className="p-4 bg-black text-white rounded-lg border-[1px] border-gray-600">
            This account is private. Follow this user to see their posts.
          </div>
        );
      }
    }

    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  else {

    const followingUsers = userId
      ? await prisma.follower.findMany({
          where: { followerId: userId },
          select: { followingId: true },
        })
      : [];

    const followingIds = followingUsers.map((follow) => follow.followingId);

    posts = await prisma.post.findMany({
      where: {
        OR: [
          // Show posts from public accounts
          { user: { isPrivate: false } },
          {
            user: {
              isPrivate: true,
              id: { in: followingIds },
            },
          },
          // Always show the user's own posts
          userId ? { userId: userId } : {},
        ],
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="p-4 bg-black text-white rounded-lg border-[1px] border-gray-600 flex flex-col gap-8 select-none">
      {posts.length
        ? posts.map((post) => (
            <Post
              key={post.id}
              post={post}
            />
          ))
        : "No posts yet"}
    </div>
  );
};

export default Feed;
