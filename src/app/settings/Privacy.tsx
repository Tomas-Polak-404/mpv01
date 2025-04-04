"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { togglePrivateAccount } from "@/lib/actions";

const PrivacySettings = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the initial state when component mounts
  useEffect(() => {
    const fetchPrivacyStatus = async () => {
      try {
        // You'll need to create this endpoint to fetch the user's privacy status
        const response = await fetch("/api/user/privacy-status");
        const data = await response.json();
        setIsPrivate(data.isPrivate);
      } catch (error) {
        console.error("Failed to fetch privacy status:", error);
        toast.error("Failed to load privacy settings");
      }
    };

    fetchPrivacyStatus();
  }, []);

  const CustomSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
        checked ? "bg-blue-500" : "bg-gray-600"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const newIsPrivate = await togglePrivateAccount();
      setIsPrivate(newIsPrivate);
      toast.success("Saved successfully");
    } catch (error) {
      console.error("Error toggling privacy:", error);
      toast.error("Saving error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (checked: boolean) => {
    setIsPrivate(checked);
  };

  return (
    <div className="p-4 space-y-6">
      <Toaster position="bottom-center" />
      <h2 className="text-2xl font-bold">Privacy Settings</h2>
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium">Private Account</h3>
            <p className="text-sm text-gray-400">
              Only approved followers can see your posts
            </p>
          </div>
          <CustomSwitch
            checked={isPrivate}
            onChange={handleToggle}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`w-full py-2 px-4 ${
          isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        } rounded-lg transition-colors duration-200 font-medium`}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default PrivacySettings;
