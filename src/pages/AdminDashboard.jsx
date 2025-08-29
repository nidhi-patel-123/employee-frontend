
// ----------------------------------------------------------------------------------------------------------------
// import React from 'react'
// import { useAuth } from '../context/authContext'
// import AdminSidebar from '../components/dashboard/AdminSidebar'
// import Navbar from '../components/dashboard/Navbar'
// import AdminSummary from '../components/dashboard/AdminSummary'
// import { Outlet } from 'react-router-dom'


// function AdminDashboard() {
//   const { user } = useAuth()



//   return (
//     <div className='flex'>
//       <AdminSidebar />
//       <div className='flex-1 ml-64 bg-gray-100 h-screen'>
//         <Navbar />
//         <Outlet />
        
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard


// ================================================================================================

import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'
import { useNotification } from '../context/notificationContext'

function AdminDashboard() {
  const { user } = useAuth()
  const { notifications } = useNotification()

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />

        {/* Notification Banner */}
        {notifications.length > 0 && (
          <div className="fixed top-20 right-5 z-50">
            {notifications.map((notif, idx) => (
              <div key={idx} className="bg-teal-500 text-white p-2 rounded mb-2 shadow-md">
                {notif.message}
              </div>
            ))}
          </div>
        )}

        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
