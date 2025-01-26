"use client";

import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className="p-4 bg-black border-[1px] border-gray-600  rounded-lg flex gap-4 justify-between text-sm">
      {/*  AVATAR */}
      <Image
        src={user?.imageUrl || "noAvantar.png "}
        width={48}
        height={48}
        alt=""
        className="w-12 h-12 rounded-full object-cover ring-2"
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form className="flex flex-col gap-4" action={(formData)=>addPost(formData, img?.secure_url || null)}>
          <div className="flex">
            <textarea
              placeholder="What's on your mind?"
              className="bg-black flex-1 rounded-lg p-2 border-[1px] text-white border-gray-600"
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <Image
              src="/emoji.png"
              width={20}
              height={20}
              alt="emoji"
              className="w-5 h-5  cursor-pointer self-end mx-2 "
            />
          </div>
          {/* POST OPTIONS */}
          <div className="flex justify-between ">
            <div className="flex items-center gap-4  text-gray-400   flex-wrap">
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result, { widget }) => {
                setImg(result.info);
                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex text-gray-400  items-center gap-2 cursor-pointer"
                    onClick={() => open()}
                  >
                    <Image
                      src="/addimage.png"
                      width={20}
                      height={20}
                      alt=""
                    />
                    Photo
                  </div>
                );
              }}
            </CldUploadWidget>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/addVideo.png"
                  width={20}
                  height={20}
                  alt=""
                />
                Video
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/addevent.png"
                  width={20}
                  height={20}
                  alt=""
                />
                Event
              </div>
            </div>
            <AddPostButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
