import React, { useEffect } from 'react'
import UserSidebar from '../../components/UserSidebar'
import { Outlet, useNavigate } from 'react-router'
import useAuthContext from '../../context/AuthContext'

const UserLayout = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])
    return (
        <>
            <div className="container my-20">
                <div className="flex gap-2 max-md:flex-col">
                    <div className="md:w-[30%] lg:w-1/4">
                        <UserSidebar />
                    </div>
                    <div className="rounded-lg bg-[#1A1A1A] flex-1 p-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLayout