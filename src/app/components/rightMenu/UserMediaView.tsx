"use client";

import { useState } from "react";

interface Media {
  id: number;
  img: string;
}

const UserMediaView = ({ media }: { media: Media[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleImageClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % media.length;
    setSelectedImage(media[nextIndex].img);
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + media.length) % media.length;
    setSelectedImage(media[previousIndex].img);
    setCurrentIndex(previousIndex);
  };

  return (
    <div className="">
      {/* Zobrazení obrázků v mřížce */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((post, index) => (
          <div
            key={post.id}
            className="relative aspect-square cursor-pointer"
            onClick={() => handleImageClick(post.img, index)}
          >
            <img
              src={post.img}
              alt={`User media ${post.id}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Popup okno pro zobrazení zvětšeného obrázku */}
      {selectedImage && (
        <div  className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-[100] bg-black ">
          <div className=" border-[1px] border-gray-600 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto px-16 bg-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Media</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 text-lg hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Zvětšený obrázek a tlačítka pro přepínání */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePrevious}
                className="text-white text-2xl hover:text-gray-400"
              >
                &larr;
              </button>
              <img
                src={selectedImage}
                alt="Selected media"
                className="max-w-full max-h-[70vh] object-contain"
              />
              <button
                onClick={handleNext}
                className="text-white text-2xl hover:text-gray-400"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMediaView;
