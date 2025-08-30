import React from 'react'
import { useAuth } from '../../context/authContext';


function Navbar() {
    const { user, logout } = useAuth()
    return (
        <div className='flex items-center text-white justify-between h-12 bg-[#395886] px-5'>
            <p >WELCOME {user.name}</p>
            <button className='px-4 py-1 bg-[#131e2e] hover:bg-[#5c6b82af]' onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar;