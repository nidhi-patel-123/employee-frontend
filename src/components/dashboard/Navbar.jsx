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

// ----------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { io } from 'socket.io-client';
import { Bell } from 'lucide-react';

const socket = io('https://employee-api-jet.vercel.app'); // replace with your backend URL

function Navbar() {
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on('newLeaveNotification', (data) => {
            setNotifications(prev => [data, ...prev]);
        });

        return () => {
            socket.off('newLeaveNotification');
        }
    }, []);

    return (
        <div className='flex items-center text-white justify-between h-12 bg-[#395886] px-5'>
            <p>WELCOME {user.name}</p>
            <div className='flex items-center space-x-4'>
                <div className='relative'>
                    <Bell size={24} className='cursor-pointer' />
                    {notifications.length > 0 && (
                        <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
                            {notifications.length}
                        </span>
                    )}
                    <div className='absolute right-0 mt-10 w-80 bg-white text-black shadow-lg rounded-md max-h-96 overflow-y-auto'>
                        {notifications.map((n, i) => (
                            <div key={i} className='p-2 border-b hover:bg-gray-100'>
                                <p className='font-bold'>{n.title}</p>
                                <p className='text-sm'>{n.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button className='px-4 py-1 bg-[#131e2e] hover:bg-[#5c6b82af]' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;
