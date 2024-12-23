import React, { useState } from 'react';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Outlet } from 'react-router';
import ScrollTop from '../../components/ScrollTop';

const AdminLayout = () => {
  const [nav, setNav] = useState(true); // To control the sidebar state

  return (
    <div className="flex transition-all duration-300 ease-in">
      <AdminSidebar setNav={setNav} nav={nav} />
      <main className={`flex-1 transition-all duration-300 ease-in ${nav && 'ml-1/5'}`}>
        <AdminTopbar />
        <div className="p-3">
          <Outlet />
        </div>
      </main>
      <ScrollTop/>
    </div>
  );
};

export default AdminLayout;
