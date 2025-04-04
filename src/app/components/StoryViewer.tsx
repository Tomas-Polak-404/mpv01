"use client";

import { Story, User } from "@prisma/client";
import Image from "next/image";
import { useEffect } from "react";

type StoryWithUser = Story & {
  user: User;
};

interface StoryViewerProps {
  story: StoryWithUser;
  onClose: () => void;
}

const StoryViewer = ({ story, onClose }: StoryViewerProps) => {
  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-[400px] h-[700px] bg-gray-800 bg-opacity-80 rounded-lg overflow-hidden">
        {/* Story header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center p-4">
          <div className="flex items-center gap-2">
            <Image
              src={story.user.avatar || "/noAvatar.png"}
              alt={story.user.username || ""}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-white">
              {story.user.name || story.user.username}
            </span>
            <span className="text-xs text-gray-300">
              {new Date(story.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute top-14 left-0 right-0 z-10 px-4">
          <div className="w-full h-1 bg-gray-700 rounded">
            <div
              className="h-full bg-white rounded transition-all duration-5000 ease-linear"
              style={{ width: "100%", animation: "progress 5s linear" }}
            ></div>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={story.img}
              alt="Story content"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <style
        jsx
        global
      >{`
        @keyframes progress {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default StoryViewer;
