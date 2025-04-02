import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import LeftMenu from "@/app/components/leftMenu/LeftMenu";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const query = searchParams.q;
  let users: User[] = [];

  if (query) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${query}`
    );
    users = await response.json();
  }

  return (
    <div className="flex gap-6 pt-6 justify-center text-white mb-4">
      <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full">
        <LeftMenu type="home" />
      </div>
      <div className="w-[38%] mx-auto p-4 border-[1px] border-gray-600 rounded-lg flex gap-6 justify-center">
        {!query && (
          <div className="text-gray-500 text-center py-8">Hledej něco...</div>
        )}

        {query && users.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            Žádní uživatelé nenalezeni pro "{query}"
          </div>
        )}

        {users.length > 0 && (
          <div className="space-y-4 text-white flex items-start justify-items-start flex-col w-[100%] ">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-800 rounded-xl transition-colors w-[100%]"
              >
                <Image
                  src={user.avatar || "/noAvatar.png"}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">
                    {user.name && user.surname
                      ? `${user.name} ${user.surname}`
                      : user.username}
                  </h3>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
