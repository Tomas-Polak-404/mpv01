import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = await auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }
  else {return null}

  return (
    <div className="p-4 bg-black border-[1px] border-gray-600 rounded-lg shadow-md text-sm flex flex-col gap-4 text-white">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-300">User Information</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link
            href="/"
            className="text-blue-500 text-xs"
          >
            See all
          </Link>
        )}
      </div>
      {/* BOTTOW */}
      <div className="flex flex-col gap-2 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-white">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex items-center gap-2">
            <Image
              src="/map.png"
              alt=""
              width={16}
              height={16}
            />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image
              src="/school.png"
              alt=""
              width={16}
              height={16}
            />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image
              src="/work.png"
              alt=""
              width={16}
              height={16}
            />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image
                src="/link.png"
                alt=""
                width={16}
                height={16}
              />
              <hr />
              <Link
                href={
                  user.website.startsWith("http")
                    ? user.website
                    : `https://${user.website}`
                }
                className="text-blue-500 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex items-center gap-1 pl-6">
            <Image
              src="/date.png"
              alt=""
              width={16}
              height={16}
            />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        {currentUserId && currentUserId !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
