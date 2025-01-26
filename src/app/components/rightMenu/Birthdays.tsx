import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="p-4 bg-black rounded-lg text-sm flex flex-col gap-4 text-white border-[1px] border-gray-600">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-300">Birthdays</span>
      </div>
      <hr className="border-t-1 border-gray-600 " />
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className=" flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/14303566/pexels-photo-14303566.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Jan Novák</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-white text-black text-sm px-2 py-1 rounded-lg">
            Celebrate
          </button>
        </div>
      </div>
      {/* UPCOMING */}
      <div className="p-4 bg-gray-950 border-[1px] border-gray-600 rounded-lg flex items-center gap-4">
        <Image
          src="/gift.png"
          alt=""
          width={24}
          height={24}
        />
        <Link
          href="/"
          className="flex flex-col gap-1 text-xs"
        >
          <span className="text-gray-500 font-semibold">
            Upcoming birthdays
          </span>
          <span className="text-gray-300">See other 15 upcoming birthdays</span>
        </Link>
      </div>
    </div>
  );
}

export default Birthdays
