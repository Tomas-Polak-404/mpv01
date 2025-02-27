"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState, useEffect, startTransition } from "react";

type RequestWithUse = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUse[] }) => {
  const [requestState, setRequestState] = useState(requests);

  useEffect(() => {
    setRequestState(requests);
  }, [requests]);

  const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );

  const handleAction = async (
    requestId: number,
    userId: string,
    action: () => Promise<void>
  ) => {
    startTransition(() => {
      removeOptimisticRequest(requestId);
    });

    try {
      await action();
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Action failed:", error);
      // Rollback if needed
      setRequestState((prev) => [
        ...prev,
        ...requests.filter((r) => r.id === requestId),
      ]);
    }
  };

  return (
    <div className="">
      {optimisticRequests.length === 0 ? (
        <div className="text-gray-400 text-center py-2">
          No one wants to be your friend... yet!
        </div>
      ) : (
        optimisticRequests.map((request) => (
          <div
            className="flex items-center justify-between"
            key={request.id}
          >
            <div className="flex items-center gap-4">
              <Image
                src={request.sender.avatar || "/noAvatar.png"}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-white">
                {request.sender.name && request.sender.surname
                  ? `${request.sender.name} ${request.sender.surname}`
                  : request.sender.username}
              </span>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  handleAction(request.id, request.sender.id, () =>
                    acceptFollowRequest(request.sender.id)
                  )
                }
              >
                <Image
                  src="/accept.png"
                  alt="Accept"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
              <button
                onClick={() =>
                  handleAction(request.id, request.sender.id, () =>
                    declineFollowRequest(request.sender.id)
                  )
                }
              >
                <Image
                  src="/reject.png"
                  alt="Decline"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequestList;
