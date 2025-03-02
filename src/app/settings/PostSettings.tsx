
"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const PostsSettings = () => {
  const [settings, setSettings] = useState({
    defaultVisibility: "public",
    commentControls: {
      allowComments: true,
      filterKeywords: "",
      restrictToFollowers: false,
    },
    archiveAfterDays: 0,
    enableExpiration: false,
    expirationDays: 7,
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

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => resolve("success"), 800);
      }),
      {
        loading: "Saving post settings...",
        success: "Post preferences updated!",
        error: "Failed to save settings",
      }
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Posts Settings</h2>

      {/* Default Visibility */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="space-y-4">
          <h3 className="font-medium">Default Post Visibility</h3>
          <select
            value={settings.defaultVisibility}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                defaultVisibility: e.target.value,
              }))
            }
            className="w-full bg-black border border-gray-600 rounded px-3 py-2"
          >
            <option value="public">Public</option>
            <option value="followers">Followers Only</option>
            <option value="private">Private</option>
          </select>
          <p className="text-sm text-gray-400">
            Set who can see your new posts by default
          </p>
        </div>
      </div>

      {/* Comment Controls */}
      <div className="p-4 bg-gray-900 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Allow Comments</h3>
            <p className="text-sm text-gray-400">
              Enable/disable comments on your posts
            </p>
          </div>
          <CustomSwitch
            checked={settings.commentControls.allowComments}
            onChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                commentControls: {
                  ...prev.commentControls,
                  allowComments: checked,
                },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Comment Filter Keywords</label>
          <input
            type="text"
            value={settings.commentControls.filterKeywords}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                commentControls: {
                  ...prev.commentControls,
                  filterKeywords: e.target.value,
                },
              }))
            }
            className="w-full bg-black border border-gray-600 rounded px-3 py-2"
            placeholder="Block comments containing (comma separated)"
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Followers Only Comments</h3>
            <p className="text-sm text-gray-400">
              Restrict commenting to your followers
            </p>
          </div>
          <CustomSwitch
            checked={settings.commentControls.restrictToFollowers}
            onChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                commentControls: {
                  ...prev.commentControls,
                  restrictToFollowers: checked,
                },
              }))
            }
          />
        </div>
      </div>

      {/* Post Archiving */}
      <div className="p-4 bg-gray-900 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Auto-Archive Posts</h3>
            <p className="text-sm text-gray-400">
              Automatically archive posts after
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={settings.archiveAfterDays}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  archiveAfterDays: Number(e.target.value),
                }))
              }
              className="w-20 bg-black border border-gray-600 rounded px-2 py-1"
              min="0"
            />
            <span>days</span>
          </div>
        </div>
      </div>

      {/* Post Expiration */}
      <div className="p-4 bg-gray-900 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Post Expiration</h3>
            <p className="text-sm text-gray-400">
              Make posts disappear after set time
            </p>
          </div>
          <CustomSwitch
            checked={settings.enableExpiration}
            onChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                enableExpiration: checked,
              }))
            }
          />
        </div>

        {settings.enableExpiration && (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={settings.expirationDays}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  expirationDays: Number(e.target.value),
                }))
              }
              className="w-20 bg-black border border-gray-600 rounded px-2 py-1"
              min="1"
            />
            <span>days</span>
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-medium"
      >
        Save Post Settings
      </button>
    </div>
  );
};

export default PostsSettings;
