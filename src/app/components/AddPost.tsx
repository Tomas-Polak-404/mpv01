import prisma from "@/lib/client";
import Image from "next/image";

const AddPost = () => {

  const testAction = async (formData:FormData) => {
    /*
    const desc = formData.get("desc") as string;
    try {
      prisma.post.create({
        data: {
          userId: userId,
          desc: desc
        }
      })
    }catch(err){
      console.log(err)
    }
    */
  };



  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/*  AVATAT */}
      <Image
        src="https://images.pexels.com/photos/937980/pexels-photo-937980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        width={48}
        height={48}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          
          className="flex gap-4 "
        >
          <textarea
            placeholder="What's on your mind?"
            className="bg-slate-100 flex-1 rounded-lg p-2"
            name="desc"
          ></textarea>
          <Image
            src="/emoji.png"
            width={20}
            height={20}
            alt=""
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button>Send</button>
        </form>
        {/* POST OPTIONS */}
        <div className="">
          <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/addimage.png"
                width={20}
                height={20}
                alt=""
              />
              Photo
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/addVideo.png"
                width={20}
                height={20}
                alt=""
              />
              Video
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/addevent.png"
                width={20}
                height={20}
                alt=""
              />
              Event
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/poll.png"
                width={20}
                height={20}
                alt=""
              />
              Poll
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
