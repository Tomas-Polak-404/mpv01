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
import SearchBar from "./SearchBar";


const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between border-b-[1px] border-gray-600">
      {/* LEFT */}
      <div className="md:hidden w-[30%] lg:block ">
        <Link
          href="/"
          className="font-bold text-2xl text-blue-600"
        >
          Babbl
        </Link>
      </div>

      {/* CENTER */}
      <div className="flex w-[50%] text-small items-center justify-center">
        <SearchBar /> {/* Použití SearchBar komponenty */}
      </div>

      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end text-white">
        <ClerkLoading>
          <div className="border-red h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image
                src="/login.png"
                alt=""
                width={40}
                height={40}
                className=""
              />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
}

export default Navbar