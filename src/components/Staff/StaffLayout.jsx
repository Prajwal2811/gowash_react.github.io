import React from 'react';
import { Outlet } from 'react-router-dom';
import StaffNavbar from '../components/Staff/Navbar';
import StaffSidebar from '../components/Staff/Sidebar';

const StaffLayout = () => {
  return (
    <>
      <StaffNavbar />
      <div className="d-flex">
        <StaffSidebar />
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default StaffLayout;
