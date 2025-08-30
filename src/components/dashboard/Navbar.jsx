// import React from 'react'
// import { useAuth } from '../../context/authContext';


// function Navbar() {
//     const { user, logout } = useAuth()
//     return (
//         <div className='flex items-center text-white justify-between h-12 bg-[#395886] px-5'>
//             <p >WELCOME {user.name}</p>
//             <button className='px-4 py-1 bg-[#131e2e] hover:bg-[#5c6b82af]' onClick={logout}>Logout</button>
//         </div>
//     )
// }

// export default Navbar;








// --------------------------------------------------------------------
// frontend/src/components/dashboard/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const BACKEND_URL = "https://employee-api-jet.vercel.app";
const socket = io(BACKEND_URL, { withCredentials: true });

function Navbar() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch existing notifications
    axios
      .get(`${BACKEND_URL}/api/notifications`, { withCredentials: true })
      .then((res) => setNotifications(res.data))
      .catch((err) => console.log(err));

    // Listen for real-time notifications from backend
    socket.on("newLeaveRequest", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => socket.off("newLeaveRequest");
  }, []);

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  return (
    <div className="flex justify-between items-center p-4 bg-[#395886] text-white shadow-md">
      {/* Left: Welcome */}
      <p className="font-semibold text-sm sm:text-base">
        WELCOME {user?.name || "USER"}
      </p>

      {/* Right: Notifications + Logout */}
      <div className="flex items-center space-x-4 relative">
        {/* Notification Bell */}
        <div className="relative">
          <Bell className="w-6 h-6 text-white cursor-pointer" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {unreadCount}
            </span>
          )}

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-72 bg-white text-black shadow-lg rounded-lg max-h-80 overflow-y-auto z-50">
            {notifications.length === 0 ? (
              <p className="p-2 text-gray-500 text-sm">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-2 border-b hover:bg-gray-100 transition-colors ${
                    n.status === "unread" ? "bg-gray-100" : ""
                  }`}
                >
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="px-4 py-1 bg-[#131e2e] hover:bg-[#5c6b82af] rounded text-sm sm:text-base transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
