"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Media {
  id: number;
  img: string;
}

const UserMediaList = ({ media }: { media: Media[] }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    router.refresh(); // Obnovení stránky po zavření
  };

  return (
    <div>
      {/* Tlačítko pro otevření popupu */}
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        See all
      </span>

      {/* Popup okno */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Media</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white text-2xl w-10 h-10 flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            {/* Zobrazení obrázků */}
            {media.length === 0 ? (
              <p className="text-gray-400 text-center">
                This user has no media.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square"
                  >
                    <img
                      src={post.img}
                      alt={`User media ${post.id}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMediaList;
