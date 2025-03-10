import Link from "next/link";
import Image from "next/image";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import PostInfo from "./PostInfo";
import prisma from "@/lib/client";

// Přidejte 'type' před export
export type FeedPostType = PostType & { 
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
};
//TODO:




const Post = async ({
  post,
  userId,
}: {
  post: FeedPostType;
  userId?: string;
}) => {
  
  const isInitiallySaved = userId
    ? (await prisma.savedPost.findFirst({
        where: {
          userId,
          postId: post.id,
        },
        select: { id: true },
      })) !== null
    : false;


  

  return (
    <div className="flex flex-col  border-[1px] border-gray-600 p-4 rounded-lg ">
      {/* USER INFO */}
      <div className="flex">
        <div className="flex items-center justify-between  w-[20%]">
          <div className="flex items-center gap-4">
            <Link
              className="cursor-pointer flex items-center gap-4"
              href={`/profile/${post.user.username}`}
            >
              <Image
                src={post.user.avatar || "/noAvatar.png"}
                width={40}
                height={40}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">
                {post.user.name && post.user.surname
                  ? `${post.user.name} ${post.user.surname}`
                  : post.user.username}
              </span>
            </Link>
          </div>
        </div>
        <Link
          href={`/thepost/${post.id}`}
          className="w-[80%] h-[50px] cursor-pointer"
          aria-label={`Přejít na příspěvek`}
        />
      </div>
      {/* POST DESCRIPTION */}
      <Link
        href={`/thepost/${post.id}`}
        className="contents" // Důležité pro správné fungování
        aria-label={`Přejít na příspěvek od ${post.user.username}`}
      >
        <div className="flex flex-col gap-4 p-4 cursor-pointer ">
          {post.img && (
            <div className="w-full min-h-96 relative">
              <Image
                src={post.img}
                fill
                className="object-cover rounded-md"
                alt="Post image"
              />
            </div>
          )}
          <p className="break-all">{post.desc}</p>
        </div>
      </Link>
      {/* INTERACTIONS */}
      <Suspense fallback="Loading...">
        <PostInteraction
          postId={post.id}
          postUsername={post.user.username}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
          initialSaved={isInitiallySaved} // Přidáno
        />
      </Suspense>
    </div>
  );
};

export default Post;