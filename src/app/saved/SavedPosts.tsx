import Post from "@/app/components/feed/Post";
import { FeedPostType } from "@/app/components/feed/Post";

const SavedPosts = ({
  initialPosts,
  userId,
}: {
  initialPosts: FeedPostType[];
  userId?: string;
}) => {
  return (
    <div className="border-[1px] border-gray-600 flex text-white p-4 h-fit gap-4 w-[40%] rounded-md ml-[2%] flex-col">
      {initialPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          userId={userId} // Předáváme userId dál
        />
      ))}
    </div>
  );
};

export default SavedPosts;
