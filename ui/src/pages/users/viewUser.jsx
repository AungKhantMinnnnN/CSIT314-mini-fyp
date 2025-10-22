import React, { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userController from "../../controllers/user.controller.js";

const ViewUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔹 Load sample users for now
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchUserData = async () => {
        const response = await userController.getAllUserInfo();
        const usersResponse = await response.data.userInfo;
        setUsers(usersResponse);
      }
      fetchUserData();
      setLoading(false);
    }, 1000); // fake loading delay

    return () => clearTimeout(timer);
  }, []);

  // 🔹 Filter by search term
  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col p-8 w-full bg-gray-50 min-h-screen">
      {/* Header row — search bar + create button */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
        </div>

        {/* Create Button */}
        <button
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => navigate("/dashboard/create")}
        >
          <UserPlus className="w-5 h-5" />
          <span className="font-medium text-sm">Create User</span>
        </button>
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow p-4 divide-y divide-gray-200">
        {loading ? (
          <div className="text-gray-500 text-center py-6">Loading users...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-6">{error}</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.userId}
              className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg transition"
            >
              {/* Left: user info */}
              <div>
                <div className="font-semibold text-gray-800">{user.username}</div>
                <div className="text-gray-500 text-sm">{user.Status.statusName}</div>
              </div>

              {/* Right: action buttons */}
              <div className="flex gap-3">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition"
                  onClick={() => console.log("Edit", user.userId)}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition"
                  onClick={() => console.log("Suspend", user.userId)}
                >
                  <Pause className="w-4 h-4" />
                  Suspend
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-6">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
