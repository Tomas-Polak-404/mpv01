// app/notifications/page.tsx
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import Link from "next/link";
import Image from "next/image";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      actor: true,
      post: true,
      comment: true,
      follower: true,
    },
  });

  return (
    <div className="flex gap-6 pt-6 justify-center text-white h-[100vh]">
      <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full">
        <LeftMenu type="profile" />
      </div>

      <div className="border-[1px] border-gray-600 flex text-white h-[90%] w-[40%] rounded-md ml-[2%] ">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>

        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 mb-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              {notification.actor && (
                <Image
                  src={notification.actor.avatar || "/noAvatar.png"}
                  alt={notification.actor.username}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
              )}

              <div className="flex-1">
                <p className="text-sm">
                  {renderNotificationMessage(notification)}
                </p>
                <time className="text-xs text-gray-400">
                  {formatDistanceToNow(notification.createdAt)} ago
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pomocná funkce pro text notifikací
function renderNotificationMessage(notification: any) {
  switch (notification.type) {
    case "LIKE_POST":
      return (
        <>
          <Link
            href={`/profile/${notification.actor?.username}`}
            className="font-bold"
          >
            {notification.actor?.username}
          </Link>
          {" liked your "}
          <Link
            href={`/post/${notification.postId}`}
            className="text-blue-500"
          >
            post
          </Link>
        </>
      );
    case "COMMENT":
      return (
        <>
          <Link
            href={`/profile/${notification.actor?.username}`}
            className="font-bold"
          >
            {notification.actor?.username}
          </Link>
          {" commented on your "}
          <Link
            href={`/post/${notification.postId}`}
            className="text-blue-500"
          >
            post
          </Link>
        </>
      );
    case "FOLLOW":
      return (
        <>
          <Link
            href={`/profile/${notification.follower?.following.username}`}
            className="font-bold"
          >
            {notification.follower?.following.username}
          </Link>
          {" started following you"}
        </>
      );
    default:
      return "New notification";
  }
}

export default NotificationsPage;
