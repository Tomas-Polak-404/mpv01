"use client";

import { useState } from "react";
import InteractiveSection from "./InteractiveSection";
import PrivacySettings from "./Privacy";

const ClientSettings = () => {
  const [activeSection, setActiveSection] = useState("privacy");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "privacy":
        return <PrivacySettings />;
      default:
        return <PrivacySettings />;
    }
  };

  return (
    <div className="border-[1px] border-gray-600 flex text-white h-[90%] w-[40%] rounded-md ml-[2%]">
      <div className="bg-black h-full w-[40%] rounded-md flex flex-col gap-3 p-2">
        <span className="text-2xl mt-2 p-2">Settings</span>
        <InteractiveSection
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      <div className="w-[150%] transition-all duration-400 ease-in-out rounded-md relative border-gray-600 border-[1px] bg-black">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default ClientSettings;