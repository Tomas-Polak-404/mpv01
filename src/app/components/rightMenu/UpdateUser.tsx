"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import React from "react";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const router = useRouter();

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });
  
  // Funkce pro zavření modálního okna
  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh(); 

  };



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
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-12 bg-black text-white rounded-lg border-[1px] border-gray-600 flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* TITLE */}
            <div className="flex items-center justify-between">
              <h1>Update Profile</h1>
              <div
                className=" text-2xl right-3 top-3 cursor-pointer text-gray-400 hover:text-white"
                onClick={handleClose}
              >
                &times;
              </div>
            </div>
            <div className=" mt-4 text-xs text-gray-500">
              Use the navbar to change the avatar or username
            </div>
            {/* COVER PIC UPLOAD */}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={user.cover || "/noCover.png"}
                        alt=""
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

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
                  className="ring-1 bg-black ring-gray-600 p-[13px] rounded-md text-sm"
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
                  className="ring-1 bg-black ring-gray-600 p-[13px] rounded-md text-sm"
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
                  className="ring-1 bg-black ring-gray-600 p-[13px] rounded-md text-sm"
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
                  className="ring-1 bg-black ring-gray-600 p-[13px] rounded-md text-sm"
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
                  className="ring-1 bg-black ring-gray-600 p-[13px] rounded-md text-sm"
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
                  className="ring-1 bg-black ring-gray-600 p-[13px] rounded-md text-sm"
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
                  className="ring-1 bg-black ring-gray-600 p-[13px] rounded-md text-sm"
                  type="text"
                  placeholder={user.website || "https://example.com"}
                  name="website"
                />
              </div>
            </div>
            <UpdateButton></UpdateButton>
            {state.success && (
              <span className="text-green-500">Profile has been updated</span>
            )}
            {state.error && (
              <span className="text-red-500">Something went wrong</span>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
