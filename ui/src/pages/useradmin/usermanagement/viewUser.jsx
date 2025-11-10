import React, { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Pause } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../../api/index.js";

const ViewUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Dynamic search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        let usersResponse = [];

        if (!searchTerm) {
          const response = await apiClient.get("/user/getAllUserInfo");
          usersResponse = response.data.data.userInfo;
        } else {
          const response = await apiClient.get("/user/searchUserInfo", {
            params: { query: searchTerm },
          });
          usersResponse = response.data.data.userInfo;
        }

        usersResponse.sort((a, b) => a.userId - b.userId);
        setUsers(usersResponse);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="flex flex-col p-8 w-full bg-gray-50 min-h-screen">
      {/* Header: Search + Create */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by user id / name ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
        </div>

        <button
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => navigate("/dashboard/usermanagement/create")}
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
        ) : users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.userId}
              className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg transition"
            >
              {/* User Info */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-800 text-base">
                    {user.username}
                  </div>
                  {user.Status?.statusName && (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        user.Status.statusName.toLowerCase() === "active"
                          ? "bg-green-100 text-green-700"
                          : user.Status.statusName.toLowerCase() === "suspended"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.Status.statusName}
                    </span>
                  )}
                </div>

                <div className="text-gray-600 text-sm">
                  {user.firstName} {user.lastName}
                </div>

                <div className="text-gray-500 text-sm">{user.email}</div>

                {/* Role below email */}
                {user.UserProfile?.roleName && (
                  <div className="text-gray-400 text-xs mt-0.5">
                    {user.UserProfile.roleName}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  to={`/dashboard/usermanagement/update/${user.userId}`}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition"
                >
                  <Edit className="w-4 h-4" /> Edit
                </Link>

                <button
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-red-100 text-sm text-red-600 transition cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/usermanagement/suspend/${user.userId}`)
                  }
                >
                  <Pause className="w-4 h-4" /> Suspend
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
