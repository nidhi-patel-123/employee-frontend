import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utlis/EmployeeHelper';
import DataTable from 'react-data-table-component';

function List() {
  const [employees,setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployee, setFilteredEmployees] = useState([])
  
    useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get("https://employee-api-jet.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(response.data)
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name:emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              // profileImage:<img width={50} className='rounded-full object-cover' src={`https://employee-api-jet.vercel.app/${emp.userId.profileImage}`} /> ,
              action: (<EmployeeButtons DepId={emp._id} />),
            }))
          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setEmpLoading(false)
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }
  return (
    <div className='p-6'>
        <div className='text-center'>
          <h3 className='text-4xl font-bold'>Manage Employees</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='Search By Dep Name' className='px-4 py-0.5 border' onChange={handleFilter} />
          <Link to="/admin-dashboard/add-employee" className='px-4 py-2 mx-8 bg-teal-600 text-white rounded'>Add New Employee</Link>
        </div>
        <div className='mt-6'>
          <DataTable columns={columns} data={filteredEmployee} pagination />
        </div>
    </div>
  )
}

export default List










// ======================================================================================================================
