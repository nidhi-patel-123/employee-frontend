import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function View() {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://employee-api-jet.vercel.app/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setEmployee(response.data.employee)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    };
    fetchEmployee();
  }, [])
  return (
    <>{employee ? (
      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
         <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">

          Employee Details
        </h2>
        {/* <div className="grid grid-cols-1 gap-6 w-full"> */}
        {/* <div>
            <img
              src={`https://employee-api-jet.vercel.app/${employee.userId.profileImage}`}
              className="rounded-full border w-72"
            />
          </div> */}
       <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-lg">

           <div className="flex space-x-2">
            <p className="font-semibold text-gray-700">Name:</p>
            <p className="text-lg text-gray-900">{employee.userId.name}</p>
          </div>
         <div className="flex space-x-2">
            <p className="font-semibold text-gray-700">Employee ID:</p>
            <p className="text-lg text-gray-900">{employee.employeeId}</p>
          </div>
          <div className="flex space-x-2">
            <p className="font-semibold text-gray-700">Date of Birth:</p>
            <p className="text-lg text-gray-900">
              {new Date(employee.dob).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <p className="font-semibold text-gray-700">Gender:</p>
            <p className="text-lg text-gray-900">{employee.gender}</p>
          </div>
          <div className="flex space-x-2">
            <p className="font-semibold text-gray-700">Department:</p>
            <p className="text-lg text-gray-900">{employee.department.dep_name}</p>
          </div>
          <div className="flex space-x-2">
            <p className="font-semibold text-gray-700">Marital Status:</p>
            <p className="text-lg text-gray-900">{employee.maritalStatus}</p>
          </div>
        </div>
      </div>
      //  </div>
    ) : <div>Loading ...</div>}</>
  )
}

export default View