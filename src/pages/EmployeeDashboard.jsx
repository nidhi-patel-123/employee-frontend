// -------------------------------------------------------------------------------------------------------------------------------
// import React from 'react'
// import Sidebar from '../components/EmployeeDashboard/Sidebar'
// import {Outlet} from 'react-router-dom'
// import Navbar from '../components/dashboard/Navbar'

// function EmployeeDashboard() {
//   return (
//      <div className='flex'>
//       <Sidebar />
//       <div className='flex-1 ml-64 bg-gray-100 h-screen'>
//         <Navbar />
//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export default EmployeeDashboard

// ----------------------------------------------------------------------------------------------------------------
import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'
import api from '../utlis/api.js'
import { useAuth } from '../context/authContext'

function EmployeeDashboard() {
  const { user } = useAuth()

  const handleLeaveRequest = async () => {
    await api.post("/employee/leave-request", {
      employeeName: user.name,
      adminId: "ADMIN_ID_HERE"  // replace with actual admin _id
    })
    alert("Leave request sent to Admin!")
  }

  return (
     <div className='flex'>
      <Sidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />

        <div className='p-4'>
          <button onClick={handleLeaveRequest} className="bg-blue-500 text-white px-4 py-2 rounded">
            Request Leave
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard
