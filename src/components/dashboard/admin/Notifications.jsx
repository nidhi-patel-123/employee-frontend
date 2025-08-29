import React from 'react';
import { useNotification } from '../../../context/notificationContext';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const { notifications } = useNotification();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow rounded w-80">
      <h3 className="font-bold text-lg mb-2">Notifications</h3>
      {notifications.length === 0 && <p>No notifications</p>}
      <ul>
        {notifications.map((n, index) => (
          <li
            key={index}
            className="border-b py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/admin-dashboard/leaves/${n.leaveId}`)}
          >
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
