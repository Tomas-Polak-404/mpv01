"use client";
import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);

  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-black text-white rounded-lg border-[1px] border-gray-600 p-2 w-32  flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-lg">
            View
          </span>
          <span className="cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-lg">
            Re-post
          </span>
          <form
            className="cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-lg"
            action={deletePostWithId}
          >
            <button className="text-red-500">
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
