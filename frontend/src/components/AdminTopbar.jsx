import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'


const AdminTopbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className='topbar bg-[#1A1A1A] p-4 flex justify-end gap-5 items-center'>
      <Link to='/admin/profile'>
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} className='cursor-pointer' />
    </div>
  )
}

export default AdminTopbar