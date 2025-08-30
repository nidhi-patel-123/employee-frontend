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








// --------------------------------------------------------------------
import React from "react";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-12 bg-[#395886] px-5 text-white">
      {/* Welcome message */}
      <p className="font-semibold text-sm sm:text-base">
        WELCOME {user?.name || "USER"}
      </p>

      {/* Logout button */}
      <button
        onClick={logout}
        className="px-4 py-1 bg-[#131e2e] hover:bg-[#5c6b82af] rounded transition-colors duration-200 text-sm sm:text-base"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
