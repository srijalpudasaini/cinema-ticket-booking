import React from 'react'
import AdminTopbar from '../../components/AdminTopbar'
import AdminSidebar from '../../components/AdminSidebar'
import { Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <>
        <AdminTopbar/>
        <AdminSidebar/>
        <Outlet/>
    </>
  )
}

export default AdminLayout