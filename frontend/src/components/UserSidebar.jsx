import { faClock, faReceipt, faTicket, faUnlockKeyhole, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router'

const UserSidebar = () => {
    const location = useLocation();
    return (
        <>
            <div className="sidebar rounded-lg bg-[#1A1A1A] p-3">
                <ul className='max-md:flex max-md:gap-4 max-md:justify-between'>
                    <li className='py-4'>
                        <Link to='/user' className={`flex gap-2 ${location.pathname == '/user' || location.pathname == '/user/'  ? 'text-main' : ''}`}>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faUserCircle} />
                            </div>
                            <span className='max-md:hidden'>
                                My Profile
                            </span>
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/tickets' className={`flex gap-2 ${location.pathname == '/user/tickets' ? 'text-main' : ''}`}>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faTicket} />
                            </div>
                            <span className='max-md:hidden'>
                                My Tickets
                            </span>
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/reservations' className={`flex gap-2 ${location.pathname == '/user/reservations' ? 'text-main' : ''}`}>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faReceipt} />
                            </div>
                            <span className='max-md:hidden'>
                                My Reservations
                            </span>
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/history' className={`flex gap-2 ${location.pathname == '/user/history' ? 'text-main' : ''}`}>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <span className='max-md:hidden'>
                                My History
                            </span>
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link to='/user/change-password' className={`flex gap-2 ${location.pathname == '/user/change-password' ? 'text-main' : ''}`}>
                            <div className="w-4">
                                <FontAwesomeIcon icon={faUnlockKeyhole} />
                            </div>
                            <span className='max-md:hidden'>
                                Change Password
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default UserSidebar