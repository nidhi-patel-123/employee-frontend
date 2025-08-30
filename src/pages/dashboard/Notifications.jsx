// frontend/src/pages/dashboard/Notifications.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fixed API URL (Only production)
  const API_URL = "https://employee-api-jet.vercel.app/api";

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_URL}/notifications`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, status: "read" } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
      alert("Failed to update notification");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-3 border-b flex justify-between items-start ${
                n.status === "unread" ? "bg-gray-100" : ""
              }`}
            >
              <div>
                <p className="font-semibold">{n.title}</p>
                <p>{n.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
              {n.status === "unread" && (
                <button
                  className="text-blue-500 text-sm hover:underline"
                  onClick={() => markAsRead(n._id)}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
