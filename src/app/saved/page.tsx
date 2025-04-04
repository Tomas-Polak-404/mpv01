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

  const savedPosts = await prisma.savedPost.findMany({
    where: { userId },
    include: {
      post: {
        include: {
          user: true, 
          likes: true, 
          _count: {
            select: { comments: true }, 
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const transformedPosts = savedPosts.map((savedPost) => ({

    id: savedPost.post.id,
    desc: savedPost.post.desc,
    img: savedPost.post.img,
    createdAt: savedPost.post.createdAt,
    updatedAt: savedPost.post.updatedAt,
    userId: savedPost.post.userId,

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
        userId={userId} 
      />
    </div>
  );
};

export default SavedPage;
