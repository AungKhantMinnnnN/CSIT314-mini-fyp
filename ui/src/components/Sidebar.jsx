import React from "react";
import { Users, UserPlus, Edit, Pause, UserCircle2, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Sidebar = ({activePage, setActivePage}) => {

  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
      e.preventDefault();
      try{
          const username = localStorage.getItem("user");
          var response = await logout(username);
          console.log(response);
      }
      catch (error){
          console.error(error.message);
          console.error(error.stack);
      }
      finally{
        navigate("/logout");
      }
    }

  return (
    <div className="h-screen w-72 bg-white text-black flex flex-col shadow-lg">
      {/* Logo space */}
      <div className="h-25 flex items-center justify-center border-b border-gray-300">
        <img src={Logo} alt="converge" className="font-bold text-xl text-gray-800"></img>
        {/* Replace the span with an <img> tag if you have a logo image */}
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
            <div className="font-semibold text-base">John Doe</div>
            <div className="text-gray-500 text-sm">User Admin</div>
          </div>
        </div>
        {/* Dropdown Arrow */}
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </div>

      {/* Menu Buttons */}
      <nav className="flex-1 p-4 space-y-3">
        {/* View */}
        <button onClick={() => setActivePage("view")} 
          className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer
        ${activePage === "view" ? "bg-gray-200" : ""}`}
        >
          <Users className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm font-medium">View</div>
            <div className="text-gray-500 text-xs">View user accounts</div>
          </div>
        </button>

        {/* Create */}
        <button onClick={() => setActivePage("create")}
          className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer
          ${activePage === "create" ? "bg-gray-200" : ""}`}
        >
          <UserPlus className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm font-medium">Create</div>
            <div className="text-gray-500 text-xs">Create user accounts</div>
          </div>
        </button>

        {/* Update */}
        <button onClick={() => setActivePage("update")}
          className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer
          ${activePage === "update" ? "bg-gray-200" : ""}`}
        >
          <Edit className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm font-medium">Update</div>
            <div className="text-gray-500 text-xs">Update user accounts</div>
          </div>
        </button>

        {/* Suspend */}
        <button onClick={() => setActivePage("suspend")}
          className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer
          ${activePage === "suspend" ? "bg-gray-200" : ""}`}
        >
          <Pause className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm font-medium">Suspend</div>
            <div className="text-gray-500 text-xs">Suspend user accounts</div>
          </div>
        </button>

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
