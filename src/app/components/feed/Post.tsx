import Link from "next/link";
import Image from "next/image";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import PostInfo from "./PostInfo";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId } = await auth();
  return (
    // Wrap the entire post in a Link that navigates to /thepost/[post.id]
    <Link href={`/thepost/${post.id}`}>
      <div className="flex flex-col gap-4 border-[1px] border-gray-600 p-4 rounded-lg cursor-pointer">
        {/* USER INFO */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={post.user.avatar || "/noAvatar.png"}
              width={40}
              height={40}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">
              {post.user.name && post.user.surname
                ? post.user.name + " " + post.user.surname
                : post.user.username}
            </span>
          </div>
          
        </div>
        {/* POST DESCRIPTION */}
        <div className="flex flex-col gap-4">
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
          <p>{post.desc}</p>
        </div>
        {/* INTERACTIONS */}
        <Suspense fallback="Loading...">
          <PostInteraction
            postId={post.id}
            likes={post.likes.map((like) => like.userId)}
            commentNumber={post._count.comments}
          />
        </Suspense>
      </div>
    </Link>
  );
};

export default Post;
