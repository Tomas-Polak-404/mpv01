
import { useState } from "react";
import LeftMenu from "../components/leftMenu/LeftMenu";
import InteractiveSection from "./InteractiveSection";
import ClientSettings from "./pageClient";

const SettingsPage = () => {


  return (
    <div className="flex gap-6 pt-6 justify-center text-white h-[100vh]">
      <div className="hidden xl:block xl:fixed w-[18%] -ml-[58%] h-full">
        <LeftMenu type="profile" />
      </div>
      <ClientSettings/>
    </div>
  );
};

export default SettingsPage;
