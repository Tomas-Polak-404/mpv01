import { User } from "@prisma/client";

import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";

import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";
import UserInfoCard from "./UserInfoCard";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6 z-50">
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      
    </div>
  );
};

export default RightMenu;
