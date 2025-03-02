
"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const ActivitySettings = () => {
  const [activityFilters, setActivityFilters] = useState({
    activityType: "all",
    timePeriod: "30d",
  });

  const [exportHistory, setExportHistory] = useState([
    { id: 1, date: "2024-03-15", status: "completed", downloadLink: "#" },
    { id: 2, date: "2024-03-20", status: "processing" },
  ]);

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "login",
      timestamp: "2024-03-25 14:30",
      device: "Chrome on Windows",
      location: "Prague, CZ",
    },
    {
      id: 2,
      type: "post",
      timestamp: "2024-03-25 12:15",
      details: "Created new post",
      postId: "#12345",
    },
    {
      id: 3,
      type: "settings",
      timestamp: "2024-03-24 09:45",
      details: "Changed password",
    },
  ];

  const requestDataExport = () => {
    const newRequest = {
      id: exportHistory.length + 1,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      downloadLink: null,
    };

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          setExportHistory((prev) => [
            { ...newRequest, status: "completed", downloadLink: "#" },
            ...prev,
          ]);
          resolve("success");
        }, 2000);
      }),
      {
        loading: "Preparing your data export...",
        success: "Data archive ready for download!",
        error: "Failed to generate export",
      }
    );
  };

  const ActivityIcon = ({ type }: { type: string }) => {
    const icons = {
      login: "🔒",
      post: "📝",
      settings: "⚙️",
      default: "💡",
    };

    return <span>{(icons as any)[type] || icons.default}</span>;
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Account Activity</h2>

      {/* Activity Filters */}
      <div className="p-4 bg-gray-900 rounded-lg flex gap-4">
        <select
          value={activityFilters.activityType}
          onChange={(e) =>
            setActivityFilters((p) => ({ ...p, activityType: e.target.value }))
          }
          className="bg-black border border-gray-600 rounded px-3 py-2"
        >
          <option value="all">All Activities</option>
          <option value="login">Logins</option>
          <option value="post">Post Actions</option>
          <option value="settings">Settings Changes</option>
        </select>

        <select
          value={activityFilters.timePeriod}
          onChange={(e) =>
            setActivityFilters((p) => ({ ...p, timePeriod: e.target.value }))
          }
          className="bg-black border border-gray-600 rounded px-3 py-2"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Activity List */}
      <div className="p-4 bg-gray-900 rounded-lg space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-3 bg-gray-800 rounded flex items-start gap-4"
          >
            <div className="text-2xl">
              <ActivityIcon type={activity.type} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium capitalize">{activity.type}</h3>
                  <p className="text-sm text-gray-400">{activity.timestamp}</p>
                </div>
                {activity.device && (
                  <span className="text-sm text-gray-400">
                    {activity.device}
                  </span>
                )}
              </div>
              {activity.details && (
                <p className="mt-2 text-sm">{activity.details}</p>
              )}
              {activity.location && (
                <p className="text-xs text-gray-400 mt-1">
                  Location: {activity.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Data Export Section */}
      <div className="p-4 bg-gray-900 rounded-lg space-y-4">
        <h3 className="text-xl font-medium">Data Export</h3>

        <button
          onClick={requestDataExport}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Request New Archive
        </button>

        <div className="space-y-2">
          <h4 className="font-medium">Export History</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400">
                  <th className="pb-2">Date Requested</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exportHistory.map((exportReq) => (
                  <tr
                    key={exportReq.id}
                    className="border-t border-gray-700"
                  >
                    <td className="py-2">{exportReq.date}</td>
                    <td className="py-2 capitalize">{exportReq.status}</td>
                    <td className="py-2">
                      {exportReq.downloadLink ? (
                        <a
                          href={exportReq.downloadLink}
                          className="text-blue-400 hover:text-blue-500"
                        >
                          Download
                        </a>
                      ) : (
                        <button
                          onClick={() => toast.error("Export not ready yet")}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySettings;
