import React, { useState } from 'react';
import Navbar from './Admin/Navbar';
import Sidebar from './Admin/Sidebar';

const AdminLayout = ({ activeTab, setActiveTab, children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {sidebarVisible && (
        <div style={{ width: '250px' }} className="d-none d-md-block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow-1">
        <Navbar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          toggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
