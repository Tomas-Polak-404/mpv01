import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import React from "react";


const LeftMenu = async ({ type }: { type: "home" | "profile" }) => {
  const { userId } = await auth();

  if (!userId) {
    console.log("userId not found");
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
  console.log(user);

  if (!user) {
    console.log("user not found");
    return null;
  }
  const profileUrl = `/profile/${user.username}`;




  return (
    <div className="flex flex-col gap-6 ">
      <div className="p-4 bg-black rounded-lg border-gray-600 border-[1px] text-sm text-white flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700"
        >
          <Image
            src="/posts.png"
            alt=""
            width={30}
            height={30}
          />
          <span>Home</span>
        </Link>
        <hr className="border-t-1 border-transparent w-36 self-center" />
        <Link
          href={profileUrl}
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700"
        >
          <Image
            src="/posts.png"
            alt=""
            width={30}
            height={30}
          />
          <span>My profile</span>
        </Link>
        <hr className="border-t-1 border-transparent w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700"
        >
          <Image
            src="/activity.png"
            alt=""
            width={30}
            height={30}
          />
          <span>Activity</span>
        </Link>
        <hr className="border-t-1 border-transparent w-36 self-center" />

        <Link
          href=""
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700"
        >
          <Image
            src="/settings.png"
            alt=""
            width={30}
            height={30}
          />
          <span>Saved</span>
        </Link>
        <hr className="border-t-1 border-transparent w-36 self-center" />

        <Link
          href="#"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700"
        >
          <Image
            src="/events.png"
            alt=""
            width={30}
            height={30}
          />
          <span>Messages</span>
        </Link>
        <hr className="border-t-1 border-transparent w-36 self-center" />

        <Link
          href="/settings"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-700"
        >
          <Image
            src="/settings.png"
            alt=""
            width={30}
            height={30}
          />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};


export default LeftMenu;
