"use client";

import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-white disabled:bg-slate-700 disabled:cursor-not-allowed text-black text-sm px-10 -py-4 rounded-full py-2"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          Posting
        </div>
      ) : (
        "Post"
      )}
    </button>
  );
};

export default AddPostButton;
