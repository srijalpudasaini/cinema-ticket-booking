import React from 'react'
import UserSidebar from '../../components/UserSidebar'
import { Outlet } from 'react-router'

const UserLayout = () => {
    return (
        <>
            <div className="container my-8">
                <div className="flex gap-2">
                    <div className="w-1/4">
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