// frontend/src/pages/dashboard/Notifications.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notifications").then((res) => {
      setNotifications(res.data);
    });
  }, []);

  const markAsRead = async (id) => {
    await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, status: "read" } : n))
    );
  };

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
              className={`p-3 border-b flex justify-between ${
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
                  className="text-blue-500 text-sm"
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
