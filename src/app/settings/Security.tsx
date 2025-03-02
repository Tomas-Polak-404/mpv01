
"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    activeSessions: [
      {
        id: 1,
        device: "Chrome on Windows",
        location: "Prague, CZ",
        lastActive: "2h ago",
      },
    ],
  });

  const handle2FAToggle = () => {
    const newValue = !settings.twoFactorAuth;
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newValue ? resolve("2FA enabled") : resolve("2FA disabled");
          setSettings((prev) => ({ ...prev, twoFactorAuth: newValue }));
        }, 800);
      }),
      {
        loading: newValue ? "Enabling 2FA..." : "Disabling 2FA...",
        success: (message) => message as string,
        error: "Failed to update 2FA settings",
      }
    );
  };

  const revokeSession = (sessionId: number) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setSettings((prev) => ({
            ...prev,
            activeSessions: prev.activeSessions.filter(
              (s) => s.id !== sessionId
            ),
          }));
          resolve("Session revoked");
        }, 500);
      }),
      {
        loading: "Revoking session...",
        success: "Session access revoked",
        error: "Failed to revoke session",
      }
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Security</h2>

      {/* Two-Factor Authentication */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={handle2FAToggle}
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
              settings.twoFactorAuth ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                settings.twoFactorAuth ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Login Alerts */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Login Alerts</h3>
            <p className="text-sm text-gray-400">
              Get notified about new logins
            </p>
          </div>
          <button
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                loginAlerts: !prev.loginAlerts,
              }))
            }
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
              settings.loginAlerts ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                settings.loginAlerts ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="p-4 bg-gray-900 rounded-lg">
        <h3 className="font-medium mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {settings.activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex justify-between items-center p-3 bg-gray-800 rounded"
            >
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-gray-400">
                  {session.location} · {session.lastActive}
                </p>
              </div>
              <button
                onClick={() => revokeSession(session.id)}
                className="text-red-400 hover:text-red-500 text-sm px-3 py-1 rounded border border-red-500 hover:border-red-600"
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
