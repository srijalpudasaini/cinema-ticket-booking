import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import useAuthContext from '../context/AuthContext'
import Cookies from 'js-cookie'


const AdminTopbar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = Cookies.get("token");
    await axios.post("http://localhost:8000/api/logout",{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      logout();
      navigate("/login");
    });
  };
  return (
    <div className='topbar bg-[#1A1A1A] p-4 flex justify-end gap-5 items-center'>
      <Link to='/admin/profile'>
        <FontAwesomeIcon icon={faUser}/>
      </Link>
      <FontAwesomeIcon icon={faSignOut} onClick={handleLogout} className='cursor-pointer'/>
    </div>
  )
}

export default AdminTopbar