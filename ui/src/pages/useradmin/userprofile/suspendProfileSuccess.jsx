import React from "react";
import { CheckCircle, IdCard, FileText, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfileSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get userProfile from navigation state
  const userProfile = location.state?.userProfile;

  if (!userProfile) {
    return (
      <div className="p-8 text-red-500">
        No profile data found. Go back to{" "}
        <button onClick={() => navigate(-1)} className="text-blue-500 underline">
          previous page
        </button>
        .
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen items-center">
      {/* Success Header */}
      <div className="flex flex-col items-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Profile Updated Successfully
        </h1>
        <p className="text-gray-500 text-center">
          The profile <strong>{userProfile.roleName}</strong> has been successfully updated.
        </p>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${userProfile.roleName}`}
            alt="Profile Icon"
            className="w-16 h-16 rounded-full border border-gray-300"
          />
          <div>
            <div className="text-xl font-semibold text-gray-800">
              {userProfile.roleName}
            </div>
            <div className="text-gray-500 text-sm capitalize">
              Profile ID: {userProfile.profileId}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-y-4 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <IdCard className="w-4 h-4 text-gray-500" /> Profile ID:{" "}
            {userProfile.profileId}
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" /> Description:{" "}
            {userProfile.description || "No description provided."}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-50 mt-10">
        <button
          className="w-60 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
        <button
          className="w-60 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
          onClick={() => navigate("/dashboard/userprofiles")}
        >
          Back to View Profiles
        </button>
      </div>
    </div>
  );
};

export default UpdateProfileSuccess;
