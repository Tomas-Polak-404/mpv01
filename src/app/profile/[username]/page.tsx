import Feed from "@/app/components/feed/Feed";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import RightMenu from "@/app/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import FollowersPopup from "@/app/components/FollowersPopup";
import FollowingsPopup from "@/app/components/FollowingsPopup";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
      followers: {
        include: {
          follower: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
      followings: {
        include: {
          following: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return notFound();
  }

  const { userId: currentUserId } = await auth();

  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });
    isBlocked = !!res;
  } else {
    isBlocked = false;
  }

  if (isBlocked) {
    return notFound();
  }

  // Formátování followerů
  const followers = user.followers.map((follow) => ({
    id: follow.follower.id,
    username: follow.follower.username,
    avatar: follow.follower.avatar,
  }));

  // Formátování followings
  const followings = user.followings.map((follow) => ({
    id: follow.following.id,
    username: follow.following.username,
    avatar: follow.following.avatar,
  }));

return (
  <div className="flex gap-6 pt-6 justify-center text-white ">
    <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full">
      <LeftMenu type="profile" />
    </div>

    <div className="w-full lg:w-[70%] xl:w-[38%] ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center border-[1px] border-gray-600 rounded-lg bg-transparent relative select-none">
          <div className="w-full h-96 relative">
            <Image
              src={user.cover || "/noCover.png"}
              alt=""
              fill
              className="object-cover rounded-sm shadow-md"
              unoptimized
            />
            <Image
              src={user.avatar || "noAvatar.png"}
              alt=""
              width={128}
              height={128}
              className="object-cover w-32 h-32 rounded-full absolute left-[25%] -translate-x-1/2 top-60 ring-4 "
            />
          </div>

          <div
            className="w-full h-20 bg-black -translate-y-20 flex items-center justify-end gap-4 "
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 100px at 25% 5%, transparent 75px, black 70px)",
              maskImage:
                "radial-gradient(circle 100px at 25% 5%, transparent 75px, black 70px)",
            }}
          >
            <div className="flex justify-start items-center w-1/2 gap-[10%]">
              <div className="flex flex-row items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">&nbsp;Posts</span>
              </div>
              <FollowersPopup
                user={user}
                followers={followers}
              />
              <FollowingsPopup
                user={user}
                followings={followings}
              />
            </div>
          </div>

          <div className="w-full -translate-y-20 -mb-20 flex">
            <h1 className="text-2xl font-medium mt-4 mb-8 text-center ml-[25%] -translate-x-1/2">
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </h1>
          </div>
        </div>

        <Feed username={user.username} />
      </div>
    </div>
    <div className="hidden xl:block xl:fixed w-[18%] ml-[58%] h-full">
      <RightMenu user={user} />
    </div>
  </div>
);
};

export default ProfilePage;
