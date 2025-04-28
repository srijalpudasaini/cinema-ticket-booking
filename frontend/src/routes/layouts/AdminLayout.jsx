import React, { useEffect, useState } from 'react';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Outlet, useNavigate } from 'react-router';
import ScrollTop from '../../components/ScrollTop';
import useAuthContext from '../../context/AuthContext';

const AdminLayout = () => {
  const [nav, setNav] = useState(true);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role != 'admin') {
      navigate('/login')
    }
  }, [])

  return (
    <div className="flex transition-all duration-300 ease-in">
      <AdminSidebar setNav={setNav} nav={nav} />
      <main className={`flex-1 transition-all duration-300 ease-in ${nav && 'ml-1/5'}`}>
        <AdminTopbar />
        <div className="p-3">
          <Outlet />
        </div>
      </main>
      <ScrollTop />
    </div>
  );
};

export default AdminLayout;
