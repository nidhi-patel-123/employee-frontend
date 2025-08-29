// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { columns, EmployeeButtons } from '../../utlis/EmployeeHelper';
// import DataTable from 'react-data-table-component';

// function List() {
//   const [employees,setEmployees] = useState([])
//     const [empLoading, setEmpLoading] = useState(false)
//     const [filteredEmployee, setFilteredEmployees] = useState([])
  
//     useEffect(() => {
//     const fetchEmployees = async () => {
//       setEmpLoading(true)
//       try {
//         const response = await axios.get("https://employee-api-jet.vercel.app/api/employee", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         })
//         console.log(response.data)
//         if (response.data.success) {
//           let sno = 1;
//           const data = await response.data.employees.map((emp) => (
//             {
//               _id: emp._id,
//               sno: sno++,
//               dep_name: emp.department.dep_name,
//               name:emp.userId.name,
//               dob: new Date(emp.dob).toLocaleDateString(),
//               // profileImage:<img width={50} className='rounded-full object-cover' src={`https://employee-api-jet.vercel.app/${emp.userId.profileImage}`} /> ,
//               action: (<EmployeeButtons DepId={emp._id} />),
//             }))
//           setEmployees(data);
//           setFilteredEmployees(data)
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error)
//         }
//       } finally {
//         setEmpLoading(false)
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleFilter = (e) => {
//     const records = employees.filter((emp) => (
//       emp.name.toLowerCase().includes(e.target.value.toLowerCase())
//     ))
//     setFilteredEmployees(records)
//   }
//   return (
//     <div className='p-6'>
//         <div className='text-center'>
//           <h3 className='text-4xl font-bold'>Manage Employees</h3>
//         </div>
//         <div className='flex justify-between items-center'>
//           <input type="text" placeholder='Search By Dep Name' className='px-4 py-0.5 border' onChange={handleFilter} />
//           <Link to="/admin-dashboard/add-employee" className='px-4 py-2 mx-8 bg-teal-600 text-white rounded'>Add New Employee</Link>
//         </div>
//         <div className='mt-6'>
//           <DataTable columns={columns} data={filteredEmployee} pagination />
//         </div>
//     </div>
//   )
// }

// export default List










// ======================================================================================================================
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utlis/EmployeeHelper";
import { Link } from "react-router-dom";

function List() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "https://employee-api-jet.vercel.app/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            name: emp.userId.name,
            dep_name: emp.department.dep_name,
            dob: new Date(emp.dob).toLocaleDateString(),
            action: (
              <EmployeeButtons
                employeeId={emp._id}
                removeFromTable={handleRemoveEmployee}
              />
            ),
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employees");
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Remove employee from table after delete
  const handleRemoveEmployee = (id) => {
    const updated = employees.filter((emp) => emp._id !== id);
    setEmployees(updated);
    setFilteredEmployees(updated);
  };

  // Filter employees by name
  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-4xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee Name"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 text-white rounded"
        >
          Add New Employee
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={filteredEmployee}
        pagination
        progressPending={empLoading}
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
}

export default List;
 