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
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("https://employee-api-jet.vercel.app", {
  transports: ["websocket", "polling"], // fallback enabled
  withCredentials: true
});

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    socket.on("newNotification", (data) => {
      setNotifications(prev => [data, ...prev]);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  return (
    <div>
      <button onClick={() => socket.emit("sendNotification", "Hello Admin!")}>
        🔔 Send Test Notification
      </button>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

