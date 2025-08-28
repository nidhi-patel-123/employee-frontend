// import React, { useEffect, useState } from "react";
// import api from "../../../utlis/api.js";
// import { io } from "socket.io-client";

// function Notifications({ adminId }) {
//   const [notifications, setNotifications] = useState([]);
//   const socket = io("https://employee-api-eight-lemon.vercel.app");

//   useEffect(() => {
//     socket.emit("joinAdminRoom", adminId);

//     socket.on("newNotification", (notif) => {
//       setNotifications(prev => [notif, ...prev]);
//     });

//     const fetchNotifications = async () => {
//       const res = await api.get(`/notification/admin/${adminId}`);
//       setNotifications(res.data);
//     }
//     fetchNotifications();

//     return () => socket.disconnect();
//   }, [adminId]);

//   return (
//     <div className="bg-white shadow rounded p-4">
//       <h4 className="font-bold mb-2">Notifications</h4>
//       <ul>
//         {notifications.map(n => (
//           <li key={n._id} className="border-b py-1">{n.message}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Notifications;
