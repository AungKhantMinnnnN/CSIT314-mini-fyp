import React from "react";
import { XCircle, IdCard, Mail, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SuspendSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get user from state
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="p-8 text-red-500">
        No user data found. Go back to{" "}
        <button onClick={() => navigate(-1)} className="text-blue-500 underline">
          previous page
        </button>
        .
      </div>
    );
  }

  // Determine role text
  let role;
  switch (user.userProfileId) {
    case 1:
      role = "Person In Need";
      break;
    case 2:
      role = "CSR Representative";
      break;
    case 3:
      role = "User Admin";
      break;
    case 4:
      role = "Platform Management";
      break;
    default:
      role = "Unknown";
  }

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen items-center">
      {/* Success Title */}
      <div className="flex flex-col items-center mb-8">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          User Suspended Successfully
        </h1>
        <p className="text-gray-500 text-center">
          {user.username} has been temporarily disabled and cannot access the portal until reactivated.
        </p>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`}
            alt="Profile"
            className="w-16 h-16 rounded-full border border-gray-300"
          />
          <div>
            <div className="text-xl font-semibold text-gray-800">
              {user.firstName + " " + user.lastName}
            </div>
            <div className="text-gray-500 text-sm capitalize">{role}</div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-y-4 gap-x-8 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <IdCard className="w-4 h-4 text-gray-500" /> User ID: {user.userId}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" /> {user.email}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-50 mt-10">
        <button
          className="w-60 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
        <button
          className="w-60 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
          onClick={() => navigate("/dashboard/usermanagement")}
        >
          Back to View Users
        </button>
      </div>
    </div>
  );
};

export default SuspendSuccess;