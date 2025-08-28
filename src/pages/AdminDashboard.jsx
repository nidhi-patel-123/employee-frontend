
// ----------------------------------------------------------------------------------------------------------------
// import React from 'react'
// import { useAuth } from '../context/authContext'
// import AdminSidebar from '../components/dashboard/AdminSidebar'
// import Navbar from '../components/dashboard/Navbar'
// import AdminSummary from '../components/dashboard/AdminSummary'
// import { Outlet } from 'react-router-dom'
// import Notifications from '../components/dashboard/admin/Notifications'


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
// --------------------------------------------------------------------------------------------------------------------
import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'
import Notifications from '../components/dashboard/admin/Notifications'

function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />

        {/* Notifications section */}
        <div className='p-4'>
          <Notifications adminId={user?._id} />
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
