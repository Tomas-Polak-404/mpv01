
import { User } from "@prisma/client";
import prisma from "@/lib/client";


import UserMediaView from "./UserMediaView";

const UserMediaCard = async ({ user }: { user: User }) => {
  // Načtení všech obrázků
  const postWithMedia = await prisma.post.findMany({
   where: {
     userId: user.id,
     img: { not: null },
   },
   include: {
     likes: {
       where: {
         postId: { not: null }, // Zajišťujeme, že bereme pouze liky u postů
       },
     },
   },
   orderBy: { createdAt: "desc" },
  });

  const media = postWithMedia.map((post) => ({
    id: post.id,
    img: post.img!,
    likes: post.likes.map((like) => like.userId),
  }));

  return (
    <div className="p-4 bg-black text-white rounded-lg border-[1px] border-gray-600 text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-white">User Media</span>
      </div>

      {/* Zobrazení obrázků pomocí UserMediaView */}
      <UserMediaView media={media} />
    </div>
  );
};

export default UserMediaCard;