import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async () => {

  const {userId} = await auth();
  if (!userId) return null;

  const requests = await prisma.followRequest.findMany( {
    where: {
      receiverId: userId
    },
    include: {
      sender: true,
    }
  })

  if(requests.length===0) return null;


  return (
    <div className="p-4 bg-black rounded-lg border-[1px] border-gray-600 text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-white">Friend requests</span>
        <Link
          href="/"
          className="text-blue-500 text-xs"
        >
          See all
        </Link>
      </div>
      {/* USER */}
      <FriendRequestList requests={requests}/>
    </div>
  );
};

export default FriendRequests;
