import React from "react";
import { CheckCircle, IdCard, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateProfileSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get profile from state (sent from navigate)
  const profile = location.state?.profile?.createdProfile || location.state?.profile;

  if (!profile) {
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
          Profile Created Successfully
        </h1>
        <p className="text-gray-500 text-center">
          The role <span className="font-medium text-gray-800">{profile.roleName}</span> has been
          successfully added to the system.
        </p>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 border border-indigo-300">
            <IdCard className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-800">{profile.roleName}</div>
            <div className="text-gray-500 text-sm">Profile ID: {profile.profileId}</div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="grid gap-4 text-gray-700 text-sm">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 mt-0.5 text-gray-500" />
            <p>{profile.description || "No description provided."}</p>
          </div>
          <div className="flex items-center gap-2">
            <IdCard className="w-4 h-4 text-gray-500" />
            Status:{" "}
            {profile.userProfileStatusId === 1 ? (
              <span className="text-green-600 font-medium">Active</span>
            ) : (
              <span className="text-gray-500 font-medium">Inactive</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-10 mt-10">
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

export default CreateProfileSuccess;
