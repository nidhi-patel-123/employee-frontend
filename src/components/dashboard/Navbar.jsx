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
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function Navbar() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications on load
    axios.get("http://localhost:5000/api/notifications").then((res) => {
      setNotifications(res.data);
    });

    // Listen for new leave requests
    socket.on("newLeaveRequest", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("newLeaveRequest");
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      {/* Notification Bell */}
      <div className="relative">
        <Bell className="w-6 h-6 text-gray-700 cursor-pointer" />
        {notifications.filter((n) => n.status === "unread").length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {notifications.filter((n) => n.status === "unread").length}
          </span>
        )}

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-2 text-gray-500 text-sm">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-2 border-b ${
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
    </div>
  );
}

export default Navbar;
