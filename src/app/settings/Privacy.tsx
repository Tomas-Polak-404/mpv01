"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    isPrivate: false,
    allowTagging: "everyone",
    allowComments: true,
    showStoryActivity: true,
  });

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

  // Custom Select Component
  const CustomSelect = ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-black border border-gray-600 rounded px-3 py-1 pr-8 cursor-pointer"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  const handleSave = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        // Simulace API callu
        setTimeout(() => resolve("success"), 1000);
      }),
      {
        loading: "Ukládám...",
        success: "Úspěšně uloženo!",
        error: "Chyba při ukládání",
      }
    );
  };

  return (
    <div className="p-4 space-y-6">
      <Toaster position="bottom-center" />

      <h2 className="text-2xl font-bold">Privacy Settings</h2>

      {/* Private Account Section */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium">Private Account</h3>
            <p className="text-sm text-gray-400">
              Only approved followers can see your posts
            </p>
          </div>
          <CustomSwitch
            checked={settings.isPrivate}
            onChange={(checked) =>
              setSettings((prev) => ({ ...prev, isPrivate: checked }))
            }
          />
        </div>
      </div>

      {/* Tagging Section */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <h3 className="font-medium mb-4">Tagging</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
            <span>Allow tagging from</span>
            <CustomSelect
              value={settings.allowTagging}
              onChange={(value) =>
                setSettings((prev) => ({ ...prev, allowTagging: value }))
              }
              options={[
                { value: "everyone", label: "Everyone" },
                { value: "followers", label: "Followers Only" },
                { value: "none", label: "No One" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 font-medium"
      >
        Save Changes
      </button>
    </div>
  );
};

export default PrivacySettings;
