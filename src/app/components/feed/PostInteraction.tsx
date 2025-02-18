"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
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
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center justify-between gap-4   p-2 rounded-xl">
          <form
            action={likeAction}
            className="h-[100%] flex justify-center items-center "
          >
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                width={16}
                height={16}
                alt=""
                className="cursor-pointer  h-[100%]"
              />
            </button>
          </form>
          <span className="text-white">{optimisticLike.likeCount}</span>
        </div>
        <div className="flex items-center gap-4 bg-black  p-2 rounded-xl">
          <Image
            src="/comment.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
        {commentNumber}
        </div>
      </div>
      
    </div>
  );
};

export default PostInteraction;
