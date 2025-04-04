"use client";
import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false); 
  const [confirmOpen, setConfirmOpen] = useState(false); 

  const deletePostWithId = async () => {
    try {
      await deletePost(postId);
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    setConfirmOpen(false);
    setOpen(false);
  };

  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt="More options"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-black text-white rounded-lg border border-gray-600 p-2 w-32 flex flex-col gap-2 text-xs shadow-lg z-30">
          <button
            className="cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-lg text-red-500"
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </button>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 w-full">
          <div className="bg-black text-white p-4 rounded-lg shadow-lg border-[1px] border-gray-600 w-[20%]">
            <span className="text-xl text-white">Delete post?</span><br/>
            <p className="mb-4 text-gray-600">
              This can't be undone and it will be removed from your profile.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-900 rounded hover:bg-gray-800"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={deletePostWithId}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
