import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Backend URL ko env variable se read karna best practice hai
    const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');

    socket.on('newLeave', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
