import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import SavedPosts from "./SavedPosts";
import LeftMenu from "../components/leftMenu/LeftMenu";
import { FeedPostType } from "../components/feed/Post";

type SavedPostWithRelations = Awaited<
  ReturnType<typeof prisma.savedPost.findMany>
>[number];

const SavedPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please login to view saved posts</div>;
  }

  // Toto je ta důležitá část:
  const savedPosts = await prisma.savedPost.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          user: true, // Načte autora příspěvku
          likes: true, // Načte všechny liky
          _count: {
            select: { comments: true }, // Spočte komentáře
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const transformedPosts = savedPosts.map((savedPost) => ({
    // Povinná základní pole
    id: savedPost.post.id,
    desc: savedPost.post.desc,
    img: savedPost.post.img,
    createdAt: savedPost.post.createdAt,
    updatedAt: savedPost.post.updatedAt,
    userId: savedPost.post.userId,

    // Vztahy
    user: savedPost.post.user,
    likes: savedPost.post.likes,
    _count: {
      comments: savedPost.post._count.comments,
    },
  })) as FeedPostType[];

  return (
    <div className="flex gap-6 pt-6 justify-center text-white mb-4">
      <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full">
        <LeftMenu type="home" />
      </div>
      <SavedPosts
        initialPosts={transformedPosts}
        userId={userId} // Předáme userId získané z auth()
      />
    </div>
  );
};

export default SavedPage;
