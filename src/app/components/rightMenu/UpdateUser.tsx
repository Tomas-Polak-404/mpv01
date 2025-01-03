"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  // Funkce pro zavření modálního okna
  const handleClose = () => {
    setOpen(false);
  };

  // Efekt pro zakázání/obnovení posouvání stránky při změně stavu 'open'
  useEffect(() => {
    if (open) {
      // Zakáže posouvání stránky při otevřeném modálním okně
      document.body.style.overflow = "hidden";
    } else {
      // Obnoví posouvání stránky při zavřeném modálním okně
      document.body.style.overflow = "";
    }

    // Vyčištění efektu při odpojení komponenty
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="fixed w-full h-screen top-0 left-0 overflow-hidden bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={updateProfile}
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* TITLE */}
            <h1>Update Profile</h1>
            <div className=" mt-4 text-xs text-gray-500">
              Use the navbar to change the avatar or username
            </div>
            {/* COVER PIC UPLOAD */}
            <div className="flex flex-col gap-4 my-4">
              <label htmlFor="">Cover Picture</label>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={user.cover || "/noCover.png"}
                  alt=""
                  width={48}
                  height={32}
                  className="w-12 h-8 rounded-md object-cover"
                />
                <span className="text-xs underline text-gray-600">Change</span>
              </div>
            </div>
            {/* WRAPPER */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor=" "
                  className="text-xs text-gray-500"
                >
                  First Name
                </label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.name || "John"}
                  name="name"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label
                  htmlFor=" "
                  className="text-xs text-gray-500"
                >
                  Surname
                </label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.surname || "Doe"}
                  name="surname"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor=" "
                  className="text-xs text-gray-500"
                >
                  Description
                </label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.description || "Blah..."}
                  name="description"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor=" "
                  className="text-xs text-gray-500"
                >
                  City
                </label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.city || "New York"}
                  name="city"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor=" "
                  className="text-xs text-gray-500"
                >
                  School
                </label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.school || "MIT"}
                  name="school"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor=" "
                  className="text-xs text-gray-500"
                >
                  Work
                </label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.work || "Apple"}
                  name="work"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor=" "
                  className="text-xs text-gray-500"
                >
                  Website
                </label>
                <input
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.website || "https://example.com"}
                  name="website"
                />
              </div>
            </div>
            <button className="bg-blue-500 p-2 mt-2 rounded-md text-white">
              Update
            </button>
            <div
              className="absolute text-lg right-3 top-3 cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
