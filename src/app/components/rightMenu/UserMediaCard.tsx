import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import prisma from "@/lib/client";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-black text-white  rounded-lg border-[1px] border-gray-600 text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-white">User Media</span>
        <Link
          href="/"
          className="text-blue-500 text-xs"
        >
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex gap-4  items-left flex-wrap">
        {postWithMedia.length
          ? postWithMedia.map((post) => (
              <div
                className="relative w-1/5 h-24"
                key={post.id}
              >
                <Image
                  src={post.img!}
                  alt=""
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            ))
          : "No media found"}
      </div>
    </div>
  );
};

export default UserMediaCard;
