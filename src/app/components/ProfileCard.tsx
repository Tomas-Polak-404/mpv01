import Image from "next/image";
const ProfileCard = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/5197153/pexels-photo-5197153.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/29311829/pexels-photo-29311829/free-photo-of-cup-of-coffee-surrounded-by-hazelnuts.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="flex h-20 flex-col justify-center items-center gap-2 my-2">
        <span className="font-semibold">John Cena</span>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <Image
              src="https://images.pexels.com/photos/29311829/pexels-photo-29311829/free-photo-of-cup-of-coffee-surrounded-by-hazelnuts.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 "
            />
            <Image
              src="https://images.pexels.com/photos/29311829/pexels-photo-29311829/free-photo-of-cup-of-coffee-surrounded-by-hazelnuts.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 "
            />
            <Image
              src="https://images.pexels.com/photos/29311829/pexels-photo-29311829/free-photo-of-cup-of-coffee-surrounded-by-hazelnuts.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3 "
            />
          </div>
          <span className="text-sm text-gray-500">500 Followers</span>
        </div>
        <button className="text-white bg-blue-500 text-xs p-2 rounded-md">My Profile</button>
      </div>
    </div>
  );
}

export default ProfileCard