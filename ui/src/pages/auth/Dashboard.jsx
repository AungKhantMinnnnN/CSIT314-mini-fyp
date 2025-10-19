import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";

// Example content for each section
const pages = {
  view: <div>Here you can view user accounts</div>,
  create: <div>Here you can create new user accounts</div>,
  update: <div>Here you can update existing user accounts</div>,
  suspend: <div>Here you can suspend user accounts</div>,
  logout: <div>You clicked Log Out</div>,
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState("view"); // default page

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 capitalize">{activePage}</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {pages[activePage]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;