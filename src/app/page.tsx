import AddPost from "./components/AddPost";
import Feed from "./components/feed/Feed";
import LeftMenu from "./components/leftMenu/LeftMenu";
import RightMenu from "./components/rightMenu/RightMenu";
import Stories from "./components/Stories";

const Homepage = () => {
  return (
    <div className="flex justify-center gap-7 pt-6 ">
      <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full ">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[38%]  ">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden xl:block xl:fixed w-[18%] ml-[58%] h-full ">
        <RightMenu />
      </div>
    </div>
  );
};

export default Homepage;
