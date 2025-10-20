import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import CreateUser from "../users/createUser.jsx";
import UpdateUser from "../users/updateUser.jsx";

// Example content for each section
const pages = {
  view: <div>Here you can view user accounts</div>,
  create: <CreateUser />,
  update: <UpdateUser />,
  suspend: <div>Here you can suspend user accounts</div>,
  logout: <div>You clicked Log Out</div>,
};

const Dashboard = ({user}) => {
  const [activePage, setActivePage] = useState("view"); // default page

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} user={user}/>

      {/* Main content */}
      <div className="flex-1 p-1 overflow-auto">
        <div className="bg-white rounded-lg shadow p-6">
          {pages[activePage]}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;