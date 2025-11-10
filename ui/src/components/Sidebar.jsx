import React from "react";
import { Users, UserPlus, Edit, Pause, UserCircle2, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Sidebar = ({activePage, setActivePage, user}) => {

  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
      e.preventDefault();
      // try{
      //     const username = localStorage.getItem("user");
      //     var response = await logout(username);
      //     console.log(response);
      // }
      // catch (error){
      //     console.error(error.message);
      //     console.error(error.stack);
      // }
      // finally{
      localStorage.removeItem("user");
      navigate("/logout");
      //}
    }

  var role; 
  switch (user.userProfileId){
    case 1: role = "Person In Need"; break;
    case 2: role = "CSR Representative"; break;
    case 3: role = "User Admin"; break;
    case 4: role = "Platform Management"; break;
    default: roleName = "Unknown";
  }


  const adminMenu = [
    { id: "usermanagement", icon: <Users className="w-5 h-5 text-gray-600" />, title: "User Management", desc: "Manage user accounts" },
    { id: "userprofiles", icon: <User className="w-5 h-5 text-gray-600" />, title: "User Profiles", desc: "Manage user profiles" },

  ]

  const csrMenu = [
    { id: "viewAllRequests", icon: <Users className="w-5 h-5 text-gray-600" />, title: "PIN Requests", desc: "Manage requests by Person-In-Need" },
    { id: "viewShortlistRequests", icon: <Users className="w-5 h-5 text-gray-600" />, title: "Shortlisted", desc: "View your shortlisted requests" },
    { id: "completedrequests", icon: <Users className="w-5 h-5 text-gray-600" />, title: "Completed", desc: "View completed requests" },
  ]

  const platformMgmMenu = [
    { id: "platformmanagement", icon: <Users className="w-5 h-5 text-gray-600" />, title: "Request Categories", desc: "Manage Categories" },
  ]

  const pinMenu = [
    { id: "createRequest", icon: <Users className="w-5 h-5 text-gray-600" />, title: "Create Request", desc: "Request for Corporate Social Responsibility Representatives" },
    { id: "viewAllRequests", icon: <Users className="w-5 h-5 text-gray-600" />, title: "View my requests", desc: "View your submitted requests" },
    { id: "completedrequests", icon: <Users className="w-5 h-5 text-gray-600" />, title: "Completed Requests", desc: "View completed matching requests" }
  ]

  // Compose final menu depending on role
  let menuItems = [];
  if (user.userProfileId === 1) menuItems = [...menuItems, ...pinMenu];
  if (user.userProfileId === 2) menuItems = [...menuItems, ...csrMenu];
  if (user.userProfileId === 3) menuItems = [...menuItems, ...adminMenu];
  if (user.userProfileId === 4) menuItems = [...menuItems, ...platformMgmMenu];
  


  return (
    <div className="h-screen w-72 bg-white text-black flex flex-col shadow-lg">
      {/* Logo space */}
      <div className="h-25 flex items-center justify-center border-b border-gray-300">
        <img src={Logo} alt="converge" className="font-bold text-xl text-gray-800"></img>
      </div>

      {/* Profile Section */}
      <div className="flex items-center justify-between p-5 border-b border-gray-300">
        <div className="flex items-center space-x-3">
          {/* Profile Icon */}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <UserCircle2 className="w-8 h-8 text-gray-600" />
          </div>
          {/* Name and Role */}
          <div>
            <div className="font-semibold text-base">{user.username}</div>
            <div className="text-gray-500 text-sm">{role}</div>
          </div>
        </div>
        {/* Dropdown Arrow */}
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-3">
        {/* Menu Buttons */}
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer
              ${activePage === item.id ? "bg-gray-200" : ""}`}
          >
            {item.icon}
            <div>
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-gray-500 text-xs">{item.desc}</div>
            </div>
          </button>
        ))}

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Log Out */}
        <button className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer 
        ${activePage === "logout" ? "bg-gray-200" : ""}`
        }
        onClick={handleLogOut}
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          <div className="text-sm font-medium">Log Out</div>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
