"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

const LikeButton = ({
  postId,
  currentLikes,
}: {
  postId: number;
  currentLikes: string[];
}) => {
  const { userId } = useAuth();
  const [optimisticLike, toggleLike] = useOptimistic(
    {
      count: currentLikes.length,
      isLiked: userId ? currentLikes.includes(userId) : false,
    },
    (state) => ({
      count: state.isLiked ? state.count - 1 : state.count + 1,
      isLiked: !state.isLiked,
    })
  );

  const handleAction = async () => {
    toggleLike(undefined);
    await switchLike(postId);
  };

  return (
    <div className="flex items-center gap-2">
      <form action={handleAction}>
        <button>
          <Image
            src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
            width={20}
            height={20}
            alt="Like"
          />
        </button>
      </form>
      <span>{optimisticLike.count}</span>
    </div>
  );
};


export default LikeButton; 