import React, { useState } from 'react';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Outlet } from 'react-router';

const AdminLayout = () => {
  const [nav, setNav] = useState(true); // To control the sidebar state

  return (
    <div className="flex transition-all duration-300 ease-in">
      <AdminSidebar setNav={setNav} nav={nav} />
      <main className={`flex-1 p-2 transition-all duration-300 ease-in ${nav && 'ml-1/5'}`}>
        <AdminTopbar />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
