import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AdminTopbar = () => {
  return (
    <div className='topbar bg-[#1A1A1A] p-4 flex justify-end gap-5'>
      <FontAwesomeIcon icon={faUser}/>
      <FontAwesomeIcon icon={faSignOut}/>
    </div>
  )
}

export default AdminTopbar