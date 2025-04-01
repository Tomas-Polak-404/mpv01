"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Follower {
  id: string;
  username: string;
  avatar: string | null;
}


const FollowersPopup = ({
  user,
  followers,
}: {
  user: User & { _count: { followers: number } };
  followers: Follower[];
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    router.refresh(); // Obnovení stránky po zavření
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div>
      {/* Tlačítko pro otevření popupu */}
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span className="font-medium">{user._count.followers}</span>
        <span className="text-sm">&nbsp;Followers</span>
      </div>

      {/* Popup okno */}
      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex items-center mt-20 justify-center z-[9999] transform-none">
            <div className="bg-black border-[1px] border-gray-600 p-6 rounded-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Followers</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 text-lg hover:text-white"
                >
                  &times;
                </button>
              </div>

              {/* Zobrazení followerů */}
              {followers.length === 0 ? (
                <p className="text-gray-400 text-center">
                  This user has no followers.
                </p>
              ) : (
                <ul>
                  {followers.map((follower) => (
                    <li
                      key={follower.id}
                      className="flex items-center gap-3 mb-3"
                    >
                      <Link
                        className="cursor-pointer flex items-center gap-4"
                        href={`/profile/${follower.username}`}
                      >
                        <img
                          src={follower.avatar || "/noAvatar.png"}
                          alt={follower.username}
                          className="w-10 h-10 rounded-full object-cover object-center"
                        />
                        <span>{follower.username}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>,
          document.getElementById("portal-root")!
        )}
    </div>
  );
};

export default FollowersPopup;
