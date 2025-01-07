import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";


const Navbar = () => {
  return (
    <div className='h-24 flex items-center justify-between '>
      {/* LEFT */}
      <div className="md:hidden w-[30%] lg:block ">
        <Link href="/" className="font-bold text-2xl text-blue-600">Babbl</Link>
      </div>
      
      {/* CENTER */}
      <div className=" flex w-[50%] text-small items-center justify-center ">
        <div className="hidden xl:flex p-2  flex-row items-center rounded-xl bg-slate-300">
          <input type="text" placeholder="Search..." className="bg-transparent outline-none" />
          <Image src="/search.png" alt="" width={14} height={14}/>
        </div>
      </div>
       
      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end ">
        <ClerkLoading>
          <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="curser-pointer ">
              <Image src="/people.png" alt="" width={24} height={24} className="" />
            </div>
            <div className="curser-pointer ">
              <Image src="/messages.png" alt="" width={24} height={24} className="" />
            </div>
            <div className="curser-pointer ">
              <Image src="/notifications.png" alt="" width={24} height={24} className="" />
            </div>
            <UserButton/>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src="/login.png" alt="" width={20} height={20} className="" />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>

        </ClerkLoaded>
        <MobileMenu/>
      </div>   
    </div>
  )
}

export default Navbar