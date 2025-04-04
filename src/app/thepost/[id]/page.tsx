import Image from "next/image";
import Comments from "@/app/components/feed/Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "@/app/components/feed/PostInteraction";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import PostInfo from "@/app/components/feed/PostInfo";
import { getPostById } from "@/lib/actions"; 
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import Link from "next/link";

// Definice typu příspěvku
type FeedPostType = PostType & {
  user: User;
} & {
  likes: { userId: string }[];
} & {
  _count: { comments: number };
};

// Funkce pro formátování relativního času
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  
  // Pro posledních 5 dní zobrazíme relativní čas (X days ago / X hours ago)
  if (diffDays < 5) {
    if (diffDays === 0) {
      // Méně než den - zobrazíme hodiny
      if (diffHours === 0) {
        return "Just now";
      } else if (diffHours === 1) {
        return "1 hour ago";
      } else {
        return `${diffHours} hours ago`;
      }
    } else if (diffDays === 1) {
      return "1 day ago";
    } else {
      return `${diffDays} days ago`;
    }
  } else {
    // Pro starší příspěvky zobrazíme běžný formát datumu
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

// Typ parametrů stránky
type PageProps = {
  params: {
    id: string;
  };
};

const ThePost = async ({ params: { id } }: PageProps) => {
  // Načteme příspěvek podle id
  const post: FeedPostType | null = await getPostById(id);
  if (!post) {
    return <div>Post not found</div>;
  }

  const { userId } = await auth();

  return (
    <div className="flex gap-6 pt-6 justify-center text-white h-[100vh]">
      <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full">
        <LeftMenu type="profile" />
      </div>
      <div className="flex text-white w-[40vw]  rounded-md ml-[2%] h-max ">
        <div className="flex flex-col gap-4 border-[1px]  w-full border-gray-600 p-4 rounded-lg mb-10 h-max">
          {/* USER */}
          <div className="flex items-center justify-between">
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
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {post.user.name && post.user.surname
                      ? `${post.user.name} ${post.user.surname}`
                      : post.user.username}
                  </span>
                  <span className="text-sm text-gray-400">
                    {formatRelativeTime(new Date(post.createdAt))}
                  </span>
                </div>
              </Link>
            </div>
            {userId === post.user.id && <PostInfo postId={post.id} />}
          </div>
          {/* DESCRIPTION */}
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
            <p className="break-all">{post.desc}</p>
          </div>
          {/* INTERACTION */}
          <Suspense fallback="Loading...">
            <PostInteraction
              postId={post.id}
              likes={post.likes.map((like) => like.userId)}
              commentNumber={post._count.comments}
            />
          </Suspense>
          <Suspense fallback="Loading...">
            <Comments postId={post.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ThePost;