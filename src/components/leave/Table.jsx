// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import DataTable from "react-data-table-component"
// import { columns, LeaveButtons } from '../../utlis/LeaveHelper';

// function Table() {
// const [leaves,setLeaves] = useState(null)
// const [filteredLeaves,setFilteredLeaves] = useState(null)

//   const fetchLeaves = async () => {
//     try {
//         const response = await axios.get("https://employee-api-jet.vercel.app/api/leave", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         })
//         console.log(response.data)
//         if (response.data.success) {
//           let sno = 1;
//           const data = await response.data.leaves.map((leave) => ({
            
//               _id: leave._id,
//               sno: sno++,
//               employeeId: leave.employeeId.employeeId,
//               name:leave.employeeId.userId.name,
//               leaveType: leave.leaveType,
//               department:leave.employeeId.department.dep_name,
//               days:
//               new Date(leave.endDate).getDate() -
//               new Date(leave.startDate).getDate(),
//               status:leave.status,
//               action: <LeaveButtons DepId={leave._id} />,
//             }))
//           setLeaves(data);
//           setFilteredLeaves(data)
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error)
//         }
//       }
//   }
//   useEffect(() => {
// fetchLeaves()
//   }, []);

//   const filterByInput = (e) => {
//     const data = leaves.filter((leave) => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
//     setFilteredLeaves(data)
//   }
//    const filterByButton = (status) => {
//     const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()));
//     setFilteredLeaves(data)
//   }

//   return (
//     <>
//     {filteredLeaves ? (
//     <div className='p-6'>
//        <div className='text-center'>
//         <h3 className='text-2xl font-bold'>Manage Leaves</h3>
//       </div>
//       <div className='flex justify-between items-center'>
//         <input type="text" placeholder='Search By Emp Id' className='px-4 py-1.5 border'
//         onChange={filterByInput}
//         />
//         <div>
//         <button className='px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 m-1 rounded-md'
//         onClick={() => filterByButton("Pending")}
//         >Pending</button>
//         <button className='px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 m-1 rounded-md'
//         onClick={() => filterByButton("Approved")}

//         >Approved</button>
//         <button className='px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 m-1 rounded-md'
//         onClick={() => filterByButton("Rejected")}

//         >Rejected</button>
//         </div>
//       </div>
      

//       <div className='mt-3'>
//       <DataTable columns={columns} data={filteredLeaves} pagination/>
//       </div>
//     </div>
//     ) : <div>Loading ...</div>}
//     </>
//   )
// }

// export default Table




import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utlis/LeaveHelper";

function Table() {
  const [leaves, setLeaves] = useState([]); // null की जगह []
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  // Fetch Leaves
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "https://employee-api-jet.vercel.app/api/leave",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);

          // सही तरीके से days निकालना
          const days =
            Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

          return {
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId?.employeeId || "",
            name: leave.employeeId?.userId?.name || "",
            leaveType: leave.leaveType,
            department: leave.employeeId?.department?.dep_name || "",
            days,
            status: leave.status,
            action: <LeaveButtons DepId={leave._id} />,
          };
        });

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Search by EmployeeId
  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    const data = leaves.filter((leave) =>
      leave.employeeId?.toString().toLowerCase().includes(value)
    );
    setFilteredLeaves(data);
  };

  // Filter by Status
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status?.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves.length > 0 ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-1.5 border rounded-md"
              onChange={filterByInput}
            />

            <div>
              <button
                className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 m-1 rounded-md"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 m-1 rounded-md"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 m-1 rounded-md"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-3">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>
      ) : (
        <div className="text-center p-6">Loading ...</div>
      )}
    </>
  );
}

export default Table;
