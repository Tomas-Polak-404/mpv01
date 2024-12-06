import Image from "next/image";

const Stories = () => {
  return (
      <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
          <div className="flex gap-8 w-max">
              {/* Příběhy uživatelů */}
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                  <Image
                      src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full ring-2"
                  />
                  <span className="font-medium">Username</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Jan</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Tom</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Ondra</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Bohdan</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Username</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Username</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">John</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Jack</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Martin</span>
              </div>
              {/* USER STORIES */}
              <div className=" flex flex-col items-center gap-2 cursor-pointer">
                  <Image src="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
                  <span className="font-medium">Usernsdfame</span>
              </div>
        </div>
    </div>
  )
}

export default Stories