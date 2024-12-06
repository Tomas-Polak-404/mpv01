import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-grey-500 font-medium">
        <span>Sponzored Ads</span>
        <Image
          src="/more.png"
          alt=""
          width={16}
          height={16}
        />
      </div>
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-72" : size === "md" ? "h-80" : "h-96"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/2739295/pexels-photo-2739295.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/2739295/pexels-photo-2739295.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={24}
            height={24}
            className="rounded-ful w-8 h-8 object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut sem felis. Nullam faucibus, diam eu sodales mollis."
            : size === "md"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut sem felis. Nullam faucibus, diam eu sodales mollis, nisl nibh scelerisque erat, eu bibendum dui leo a leo."
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut sem felis. Nullam faucibus, diam eu sodales mollis, nisl nibh scelerisque erat, eu bibendum dui leo a leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut sem felis. Nullam faucibus, diam eu sodales mollis, nisl nibh scelerisque erat, eu bibendum dui leo a leo. "}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">Learn more</button>
      </div>
    </div>
  );
};

export default Ad;
