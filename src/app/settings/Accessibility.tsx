
"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    keyboardNavigation: false,
    reduceMotion: false,
    highContrast: false,
    textSize: 100, // percentage
  });

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => resolve("success"), 800);
      }),
      {
        loading: "Saving accessibility settings...",
        success: "Accessibility preferences updated!",
        error: "Failed to save settings",
      }
    );
  };

  const CustomSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
        checked ? "bg-blue-500" : "bg-gray-600"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Accessibility</h2>

      {/* Dark Mode */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Dark Mode</h3>
            <p className="text-sm text-gray-400">
              Enable dark theme for better readability
            </p>
          </div>
          <CustomSwitch
            checked={settings.darkMode}
            onChange={(checked) =>
              setSettings((prev) => ({ ...prev, darkMode: checked }))
            }
          />
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Keyboard Navigation</h3>
            <p className="text-sm text-gray-400">
              Enable keyboard shortcuts and focus indicators
            </p>
          </div>
          <CustomSwitch
            checked={settings.keyboardNavigation}
            onChange={(checked) =>
              setSettings((prev) => ({ ...prev, keyboardNavigation: checked }))
            }
          />
        </div>
      </div>

      {/* Reduce Motion */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Reduce Motion</h3>
            <p className="text-sm text-gray-400">
              Minimize animations and transitions
            </p>
          </div>
          <CustomSwitch
            checked={settings.reduceMotion}
            onChange={(checked) =>
              setSettings((prev) => ({ ...prev, reduceMotion: checked }))
            }
          />
        </div>
      </div>

      {/* High Contrast Mode */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">High Contrast Mode</h3>
            <p className="text-sm text-gray-400">
              Increase color contrast for better visibility
            </p>
          </div>
          <CustomSwitch
            checked={settings.highContrast}
            onChange={(checked) =>
              setSettings((prev) => ({ ...prev, highContrast: checked }))
            }
          />
        </div>
      </div>

      {/* Text Size */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Text Size</h3>
            <span className="text-blue-400">{settings.textSize}%</span>
          </div>
          <input
            type="range"
            min="100"
            max="150"
            value={settings.textSize}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                textSize: Number(e.target.value),
              }))
            }
            className="w-full bg-gray-800 rounded-lg appearance-none h-2"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>100%</span>
            <span>150%</span>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <h3 className="font-medium mb-4">Preview</h3>
        <div
          className={`p-4 rounded-lg transition-all ${
            settings.highContrast
              ? "bg-black text-yellow-400"
              : "bg-gray-800 text-white"
          }`}
          style={{ fontSize: `${settings.textSize}%` }}
        >
          <p>Sample text showing current accessibility settings</p>
          <button className="mt-2 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600">
            Example Button
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-medium"
      >
        Save Accessibility Settings
      </button>
    </div>
  );
};

export default AccessibilitySettings;
