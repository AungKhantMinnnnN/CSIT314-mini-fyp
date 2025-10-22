import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";

const Dashboard = ({user}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage = location.pathname.split("/").pop();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={(page) => navigate(`/dashboard/${page}`)} 
        user={user}
      />

      {/* Main content */}
      <div className="flex-1 p-1 overflow-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet /> {/* renders nested route content */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;