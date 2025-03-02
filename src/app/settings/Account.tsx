// components/settings/AccountSettings.tsx
"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const AccountSettings = () => {
  const [accountDetails, setAccountDetails] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
      
      <h2 className="text-2xl font-bold">Account Settings</h2>

      {/* Email Section */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={accountDetails.email}
          onChange={(e) =>
            setAccountDetails((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full bg-black border border-gray-600 rounded px-3 py-2"
          placeholder="Enter new email"
        />
      </div>

      {/* Password Change Section */}
      <div className="p-4 bg-gray-900 rounded-lg space-y-4">
        <div>
          <label className="block mb-2 font-medium">Current Password</label>
          <input
            type="password"
            value={accountDetails.currentPassword}
            onChange={(e) =>
              setAccountDetails((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            className="w-full bg-black border border-gray-600 rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">New Password</label>
          <input
            type="password"
            value={accountDetails.newPassword}
            onChange={(e) =>
              setAccountDetails((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            className="w-full bg-black border border-gray-600 rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            value={accountDetails.confirmPassword}
            onChange={(e) =>
              setAccountDetails((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="w-full bg-black border border-gray-600 rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 font-medium"
      >
        Update Account
      </button>
    </div>
  );
};

export default AccountSettings;
