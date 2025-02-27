"use client";

import { useState } from "react";
import LikeButton from "@/app/components/LikeButton";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

interface Media {
  id: number;
  img: string;
  likes: string[];
}

const UserMediaView = ({ media }: { media: Media[] }) => {
  const { userId } = useAuth();
  const [selectedPost, setSelectedPost] = useState<Media | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Filtrujeme pouze příspěvky s platným obrázkem
  const validMedia = media.filter((post) => post.img && post.img.trim() !== "");

  const handleImageClick = (post: Media, index: number) => {
    setSelectedPost(post);
    setCurrentIndex(index);
  };

  const handleClose = () => setSelectedPost(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % validMedia.length;
    setSelectedPost(validMedia[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + validMedia.length) % validMedia.length;
    setSelectedPost(validMedia[previousIndex]);
    setCurrentIndex(previousIndex);
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {validMedia.map((post, index) => (
          <div
            key={post.id}
            className="relative aspect-square cursor-pointer"
            onClick={() => handleImageClick(post, index)}
          >
            <img
              src={post.img}
              alt={`User media ${post.id}`}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="border-gray-600 border-[1px] p-12 rounded-lg w-full max-w-4xl max-h-[90vh] bg-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Media</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePrevious}
                className="text-white hover:text-gray-400 text-2xl"
              >
                &larr;
              </button>

              {selectedPost.img && (
                <Link
                href={`/thepost/${selectedPost.id}`}>
                  <img
                    src={selectedPost.img}
                    alt="Selected media"
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </Link>
              )}

              <button
                onClick={handleNext}
                className="text-white hover:text-gray-400 text-2xl"
              >
                &rarr;
              </button>
            </div>

            <div className="mt-4 flex justify-center gap-6">
              <LikeButton
                postId={selectedPost.id}
                currentLikes={selectedPost.likes}
              />
              <Link
                href={`/thepost/${selectedPost.id}`}
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <Image
                  src="/comment.png"
                  width={20}
                  height={20}
                  alt="Comments"
                  className="cursor-pointer"
                />
                <span className="text-white">Comments</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMediaView;
