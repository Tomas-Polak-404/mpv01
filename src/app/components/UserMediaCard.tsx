import Link from "next/link"
import Image from "next/image"

const UserMediaCard = ( { userId } : { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link
          href="/"
          className="text-blue-500 text-xs"
        >
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/29548868/pexels-photo-29548868/free-photo-of-historic-view-of-roman-forum-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default UserMediaCard