"use client";

import { addComment, deleteComment} from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User, Like } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState, useEffect } from "react";


type CommentWithUserAndLikes = Comment & {
  user: User;
  likes: Like[];
};

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUserAndLikes[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] =
    useState<CommentWithUserAndLikes[]>(comments);
  const [desc, setDesc] = useState("");

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const [commentLikes, setCommentLikes] = useState<{
    [commentId: number]: {
      likeCount: number;
      isLiked: boolean;
    };
  }>({});

  useEffect(() => {
    const likesState: {
      [commentId: number]: {
        likeCount: number;
        isLiked: boolean;
      };
    } = {};

    comments.forEach((comment) => {
      const likes = comment.likes || [];
      likesState[comment.id] = {
        likeCount: likes.length,
        isLiked: user ? likes.some((like) => like.userId === user.id) : false,
      };
    });

    setCommentLikes(likesState);
  }, [comments, user]);

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value.slice(0, 280);
    setDesc(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffDays < 5) {
      if (diffDays === 0) {
        
        if (diffHours === 0) {
          return "Just now";
        } else if (diffHours === 1) {
          return "1 hour ago";
        } else {
          return `${diffHours} hours ago`;
        }
      } else if (diffDays === 1) {
        return "1 day ago";
      } else {
        return `${diffDays} days ago`;
      }
    } else {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const add = async () => {
    if (!user || !desc) return;

    const newComment: CommentWithUserAndLikes = {
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
        allowComments: true,
        isPrivate: false,
      },
      likes: [], 
    };

    addOptimisticComment(newComment);
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [{ ...createdComment, likes: [] }, ...prev]);

      setCommentLikes((prev) => ({
        ...prev,
        [createdComment.id]: {
          likeCount: 0,
          isLiked: false,
        },
      }));

      setDesc(""); 
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

 const deleteCommentWithId = async (commentId: number) => {
   try {
     const result = await deleteComment(commentId);

     if (result && result.success) {
       setCommentState((prev) =>
         prev.filter((comment) => comment.id !== commentId)
       );

       setConfirmDelete(null);
       setOpenMenu(null);
     } else {
       console.error(
         "Error deleting comment:",
         result?.error || "Unknown error"
       );
       
     }
   } catch (error) {
     console.error("Error deleting comment:", error);
   }
 };

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithUserAndLikes[],
    CommentWithUserAndLikes
  >(commentState, (state, newComment) => [newComment, ...state]);

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
              className="bg-black rounded-lg p-2 text-white flex-1 max-w-[30vw] testCss outline-none resize-none"
              value={desc}
              onChange={handleDescChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <div className="">
        {/* COMMENT */}
        {optimisticComments.map((comment) => {
          const isOwnComment = user && user.id === comment.userId;

          return (
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
                <div className="flex items-center gap-2">
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
                  <span className="text-xs text-gray-400">
                    {formatRelativeTime(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="break-all">{comment.desc}</p>
                
              </div>
              {isOwnComment && (
                <div className="relative">
                  <Image
                    src="/more.png"
                    alt=""
                    width={16}
                    height={16}
                    className="cursor-pointer w-4 h-4"
                    onClick={() =>
                      setOpenMenu(openMenu === comment.id ? null : comment.id)
                    }
                  />

                  {openMenu === comment.id && (
                    <div className="absolute top-4 right-0 bg-black text-white rounded-lg border border-gray-600 p-2 w-32 flex flex-col gap-2 text-xs shadow-lg z-30">
                      <button
                        className="cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-lg text-red-500"
                        onClick={() => setConfirmDelete(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              {confirmDelete === comment.id && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 w-full">
                  <div className="bg-black text-white p-4 rounded-lg shadow-lg border-[1px] border-gray-600 w-[20%]">
                    <span className="text-xl text-white">Delete comment?</span>
                    <br />
                    <p className="mb-4 text-gray-600">
                      This can't be undone and it will be removed from this
                      post.
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-4 py-2 bg-gray-900 rounded hover:bg-gray-800"
                        onClick={() => setConfirmDelete(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => deleteCommentWithId(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentList;
