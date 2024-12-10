import Feed from "@/app/components/Feed";
import LeftMenu from "@/app/components/LeftMenu";
import RightMenu from "@/app/components/RightMenu";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="flex gap-6 pt-6 ">
      <div className="hidden xl:block w-[30%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src="https://images.pexels.com/photos/27559206/pexels-photo-27559206/free-photo-of-a-group-of-people-standing-on-the-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                fill
                className="object-cover rounded-sm shadow-md"
              />
              <Image
                src="https://images.pexels.com/photos/16573354/pexels-photo-16573354/free-photo-of-funny-dog-in-wind.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                width={128}
                height={128}
                className="object-cover w-32 h-32 rounded-full absolute left-0 right-0 m-auto ring-4 ring-white -bottom-16"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">Mark Zuckerberg</h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">12</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">1.3k</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">687</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden xl:block w-[30%]">
        <RightMenu userId="test" />
      </div>
    </div>
  );
}

export default ProfilePage