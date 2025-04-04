"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { Bookmark, MessageCircleDashed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useOptimistic, useState } from "react";
import { toggleSave } from "@/lib/actions";

const PostInteraction = ({
  postId,
  postUsername,
  likes,
  commentNumber,
  initialSaved,
}: {
  postId: number;
  postUsername?: string;
  likes: string[]; // Tento typ musí odpovídat tomu, co přichází z rodiče
  commentNumber: number;
  initialSaved?: boolean;
}) => {
  const { isLoaded, userId } = useAuth();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [optimisticSave, toggleOptimisticSave] = useOptimistic(
    isSaved,
    (state) => !state
  );

  useEffect(() => {
    setIsSaved(initialSaved);
  }, [initialSaved]);

  
  // Opravené mapování pro likes
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLIke] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const handleSave = async () => {
    if (!userId) return;
    toggleOptimisticSave(undefined);
    await toggleSave(postId);
    setIsSaved(!isSaved);
  };

  const likeAction = async () => {
    switchOptimisticLIke("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-between text-sm my-2 ">
      <div className="flex gap-8  w-[95%]">
        <div className="flex items-center justify-between gap-4   p-2 rounded-xl">
          <form
            action={likeAction}
            className="h-[100%] flex justify-center items-center"
          >
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                width={20}
                height={20}
                alt=""
                className="cursor-pointer  h-[100%]"
              />
            </button>
          </form>
          <span className="text-white">{optimisticLike.likeCount}</span>
        </div>
        <Link
          href={`/thepost/${postId}`}
          aria-label={`Přejít na příspěvek od ${postUsername}`}
          className="w-[90%]"
        >
          <div
            id="comments"
            className="flex items-center gap-4 p-2"
          >
            <MessageCircleDashed
              size={20}
              absoluteStrokeWidth={true}
            />
            {commentNumber}
          </div>
        </Link>
      </div>

      <form action={handleSave}>
        <button type="submit">
          <Bookmark
            size={20}
            className={`mr-2 transition-all ${
              optimisticSave
                ? "fill-blue-500 stroke-blue-500"
                : "fill-none stroke-gray-400"
            }`}
            fill={optimisticSave ? "currentColor" : "none"}
          />
        </button>
      </form>
    </div>
  );
};

export default PostInteraction;
