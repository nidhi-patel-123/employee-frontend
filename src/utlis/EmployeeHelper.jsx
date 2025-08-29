// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/authContext";

// export const columns = [
//     {
//         name: "S No",
//         selector: (row) => row.sno,
//         width: "70px"
//     },
//     {
//         name: "Name",
//         selector: (row) => row.name,
//         sortable:true,
//         width: "130px"
//     },
//     //  {
//     //     name: "Image",
//     //     selector: (row) => row.profileImage,
//     //     width: "90px"
//     // },
//      {
//         name: "Department",
//         selector: (row) => row.dep_name,
//         width: "120px"
        
//     },
//     {
//         name: "DOB",
//         selector: (row) => row.dob,
//         sortable:true,
//         width: "130px"

//     },
//     {
//         name: "Action",
//         selector: (row) => row.action,
//         center:"true"
//     },
//   ];

// export const fetchDepartments = async () => {
//   let departments
//   try {
//     const response = await axios.get(
//       "https://employee-api-jet.vercel.app/api/department", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//     if (response.data.success) {
//       departments = response.data.departments
//     }
//   } catch (error) {
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.error)
//     }
//   }
//   return departments
// };

// // employees for salary from 
// export const getEmployees = async (id) => {
//   let employees;
//   try {
//     const response = await axios.get(
//       `https://employee-api-jet.vercel.app/api/employee/department/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     console.log(response)
//     if (response.data.success) {
//       employees = response.data.employees
//     }
//   } catch (error) {
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.error)
//     }
//   }
//   return employees
// };


// export const EmployeeButtons = ({ DepId }) => {
//   const navigate = useNavigate()

//   return (
//     <div className="flex space-x-3">
//       <button className="px-4 py-2 bg-teal-600 text-white"
//         onClick={() => navigate(`/admin-dashboard/employees/${DepId}`)}
//       >View</button>
//       <button className="px-4 py-2 bg-blue-600 text-white"
//       onClick={() => navigate(`/admin-dashboard/employees/edit/${DepId}`)}
//       >Edit
//       </button>
//       <button className="px-4 py-2 bg-yellow-600 text-white"
//       onClick={() => navigate(`/admin-dashboard/employees/salary/${DepId}`)}
//       >
//         salary
//       </button>
//       <button className="px-4 py-2 bg-red-600 text-white"
//       onClick={() => navigate(`/admin-dashboard/employees/leaves/${DepId}`)}
//       >Leave
//       </button>
//     </div>
//   )
// }



// --------------------------------------------------------------------------------------------------------------------------------
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Table columns definition
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "130px",
  },
  // {
  //   name: "Image",
  //   selector: (row) => row.profileImage,
  //   width: "90px",
  // },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

// Fetch all departments
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(
      "https://employee-api-jet.vercel.app/api/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// Fetch employees by department
export const getEmployees = async (departmentId) => {
  let employees;
  try {
    const response = await axios.get(
      `https://employee-api-jet.vercel.app/api/employee/department/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

// Delete employee function
export const deleteEmployee = async (employeeId) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    // Make sure employeeId is correct _id from employee row
    const response = await axios.delete(
      `https://employee-api-jet.vercel.app/api/employee/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Employee deleted successfully!");
      window.location.reload(); // or you can update state to remove employee from table
    } else {
      alert("Failed to delete employee.");
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      alert(error.response.data.error);
    } else {
      alert("Something went wrong while deleting employee.");
    }
  }
};

// Employee action buttons component
export const EmployeeButtons = ({ employeeId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-2 bg-teal-600 text-white"
        onClick={() =>
          navigate(`/admin-dashboard/employees/${employeeId}`)
        }
      >
        View
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white"
        onClick={() =>
          navigate(`/admin-dashboard/employees/edit/${employeeId}`)
        }
      >
        Edit
      </button>
      <button
        className="px-4 py-2 bg-yellow-600 text-white"
        onClick={() =>
          navigate(`/admin-dashboard/employees/salary/${employeeId}`)
        }
      >
        Salary
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-white"
        onClick={() =>
          navigate(`/admin-dashboard/employees/leaves/${employeeId}`)
        }
      >
        Leave
      </button>
      <button
        className="px-4 py-2 bg-gray-800 text-white"
        onClick={() => deleteEmployee(employeeId)}
      >
        Delete
      </button>
    </div>
  );
};
