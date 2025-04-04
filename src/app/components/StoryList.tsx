"use client";

import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StoryViewer from "./StoryViewer";

type StoryWithUser = Story & {
  user: User;
};

const StoryList = ({
  stories,
  currentUser,
}: {
  stories: StoryWithUser[];
  currentUser: User | null;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [uploading, setUploading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<StoryWithUser | null>(
    null
  );
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { user } = useUser();

  const hasUserStory =
    currentUser && storyList.some((story) => story.userId === currentUser.id);

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const handleStoryCreate = async (url: string) => {
    setUploading(true);
    try {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      // Create story in DB
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: url,
          expiresAt: expiresAt.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create story");
      }

      const newStory = await response.json();



      startTransition(() => {
        if (currentUser) {
          addOptimisticStory({
            ...newStory,
            user: currentUser,
          });
        }
      });

      window.location.reload();
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Failed to create your story");
    } finally {
      setUploading(false);
    }
  };

  const openStory = (story: StoryWithUser) => {
    setSelectedStory(story);
  };

  const closeStoryViewer = () => {
    setSelectedStory(null);
  };


  
  const userStory =
    currentUser &&
    optimisticStories.find((story) => story.userId === currentUser.id);

  return (
    <>
      {/* Add/View story button */}
      {userStory ? (
        <div
          onClick={() => openStory(userStory)}
          className="flex flex-col items-center gap-2 cursor-pointer relative"
        >
          <div className="w-20 h-20 rounded-full ring-2 ring-blue-500 p-1">
            <div className="relative w-full h-full">
              <Image
                src={user?.imageUrl || currentUser?.avatar || "/noAvatar.png"}
                alt="Your profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <span className="font-medium text-xs">Your story</span>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="social"
          onSuccess={(result: any, { widget }: any) => {
            if (result?.info?.secure_url) {
              handleStoryCreate(result.info.secure_url);
              widget.close();
            }
          }}
        >
          {({ open }) => {
            return (
              <div
                onClick={() => !uploading && open()}
                className="flex flex-col items-center gap-2 cursor-pointer relative"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={
                      user?.imageUrl || currentUser?.avatar || "/noAvatar.png"
                    }
                    alt="Your profile"
                    fill
                    className="rounded-full object-cover ring-2 ring-gray-500"
                  />
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-white text-xl">+</span>
                  </div>
                </div>
                <span className="font-medium text-xs">
                  {uploading ? "Uploading..." : "Add story"}
                </span>
              </div>
            );
          }}
        </CldUploadWidget>
      )}

      {/* Other users' stories */}
      {optimisticStories
        .filter((story) =>
          currentUser ? story.userId !== currentUser.id : true
        )
        .map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => openStory(story)}
          >
            <div className="w-20 h-20 rounded-full ring-2 ring-pink-500 p-1">
              <div className="relative w-full h-full">
                <Image
                  src={story.user.avatar || "/noAvatar.png"}
                  alt={story.user.username || ""}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <span className="font-medium text-xs">
              {story.user.name || story.user.username}
            </span>
          </div>
        ))}

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={closeStoryViewer}
        />
      )}
    </>
  );
};

export default StoryList;
