"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState } from "react";
type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  // Přidána logika pro omezení délky komentáře
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value.slice(0, 280);
    setDesc(input);
  };

  // Nová funkce pro zpracování klávesových zkratek
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const add = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
      setDesc(""); // Resetovat textarea po odeslání
    } catch (err) {}
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-black text-white border-[1px] border-gray-600 rounded-xl text-sm px-6 py-2 w-full"
          >
            <textarea
              placeholder="Write a comment..."
              className="bg-black rounded-lg p-2  text-white flex-1 max-w-[30vw] testCss outline-none resize-none"
              value={desc}
              onChange={handleDescChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      )}
      <div className="">
        {/* COMMENT */}
        {optimisticComments.map((comment) => (
          <div
            className="flex gap-4 justify-between mt-6"
            key={comment.id}
          >
            {/* AVATAR */}
            <Link
              className="cursor-pointer"
              href={`/profile/${comment.user.username}`}
            >
              <Image
                src={comment.user.avatar || "noAvatar.png"}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            </Link>
            {/* DESC */}
            <div className="flex flex-col gap-2 flex-1">
              <Link
                className="cursor-pointer"
                href={`/profile/${comment.user.username}`}
              >
                <span className="font-medium">
                  {comment.user.name && comment.user.surname
                    ? comment.user.name + " " + comment.user.surname
                    : comment.user.username}
                </span>
              </Link>
              <p className="break-all">{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-white mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt=""
                    width={12}
                    height={12}
                    className="cursor-pointer w-4 h-4"
                  />
                  <span className="text-white">0</span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>
            {/* ICON */}
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            ></Image>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
