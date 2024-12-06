import { faClock, faReceipt, faTicket, faUnlockKeyhole, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router'

const UserSidebar = () => {
    return (
        <>
            <div className="sidebar rounded-lg bg-[#1A1A1A] p-3">
                <ul>
                    <li className='py-4'>
                        <Link to='/user/profile' className='flex gap-2'>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faUserCircle} />
                            </div>
                            My Profile
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/tickets' className='flex gap-2'>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faTicket} />
                            </div>
                            My Tickets
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/reservations' className='flex gap-2'>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faReceipt} />
                            </div>
                            My Reservations
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/history' className='flex gap-2'>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            My History
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/change-password' className='flex gap-2'>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faUnlockKeyhole} />
                            </div>
                            Change Password
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UserSidebar