"use client";

import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { useActionState } from "react"; // Změna importu
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";
import { Image as ImgIcon } from "lucide-react";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  // Aktualizováno na useActionState
  const [state, formAction] = useActionState<
    { error: string | null },
    FormData
  >(addPost, { error: null });

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value.slice(0, 280);
    setDesc(input);
  };

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className="p-4 bg-black border-[1px] border-gray-600 rounded-lg flex gap-4 justify-between text-sm">
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        width={48}
        height={48}
        alt=""
        className="w-12 h-12 rounded-full object-cover ring-2"
      />

      <div className="flex-1">
        <form
          className="flex flex-col gap-4"
          action={formAction}
        >
          <div className="flex">
            <textarea
              placeholder="What's on your mind?"
              className="bg-black rounded-lg p-2 border-[1px] text-white border-gray-600 flex-1 max-w-[31vw] testCss outline-none resize-none"
              name="desc"
              value={desc}
              onChange={handleDescChange}
            ></textarea>
          </div>

          {/* Skryté pole pro obrázek */}
          <input
            type="hidden"
            name="img"
            value={img?.secure_url || "null"} // Místo prázdného řetězce posíláme "null"
          />

          <div className="flex justify-between">
            <div className="flex items-center gap-4 text-gray-400 flex-wrap">
              <CldUploadWidget
                uploadPreset="social"
                onSuccess={(result, { widget }) => {
                  setImg(result.info);
                  widget.close();
                }}
              >
                {({ open }) => (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => open()}
                  >
                    <ImgIcon/>
                    Photo
                  </div>
                )}
              </CldUploadWidget>
              {/* Zbytek tlačítek */}
            </div>

            <div className="text-right text-gray-400 mx-2 ml-4 h-[100%] flex items-center justify-center gap-6">
              {desc.length} / 280
              {state?.error && (
                <span className="text-red-500 text-sm">{state.error}</span>
              )}
              <AddPostButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
