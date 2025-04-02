import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();

  let posts: any[] = [];

  // Pokud je zadané 'username', zobrazí se příspěvky pouze od tohoto uživatele
  if (username) {
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

  // Pokud není 'username' a uživatel je přihlášen, zobrazí se příspěvky všech uživatelů
  if (!username) {
    posts = await prisma.post.findMany({
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
