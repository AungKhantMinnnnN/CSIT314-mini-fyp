import React, { useState, useEffect } from "react";
import { AlertTriangle, FileText, IdCard, XCircle, ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api/index.js";

const SuspendProfile = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [confirmMode, setConfirmMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch profile info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.post("/user/getUserProfile", { profileId });
        const result = response.data.data.userProfile;
        setProfile(result);

      } catch (error) {
        console.error("Failed to fetch profile info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profileId]);

  const handleSuspend = async () => {
    try {
      const requestBody = {
        userProfile: {
          profileId: profile.profileId,
          userProfileStatusId: profile.userProfileStatusId,
        },
      };

      const response = await apiClient.post("/user/suspend-profile", requestBody);
      const result = response.data.data

      if (!result.userProfile.isProfileSuspended) {
            alert(result.message || "User is already suspended.");
            return;
        }
      console.log({ userProfile: profile } )
      navigate("/dashboard/userprofiles/suspend-success", { state: { userProfile: profile } });
    } catch (error) {
      console.error("Error suspending profile:", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Loading profile data...</div>;
  }

  if (!profile) {
    return <div className="p-8 text-red-500">Profile not found.</div>;
  }

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-1">
          <XCircle className="w-7 h-7 text-red-500" />
          {confirmMode ? "Confirm Suspend" : "Suspend Profile"}
        </h1>
        <p className="text-gray-500 mb-6">
          {confirmMode
            ? `Are you sure you want to suspend the profile "${profile.roleName}"? This will disable users under this profile.`
            : "Temporarily disable this user profile and all users associated with it."}
        </p>
      </div>

      {/* Warning Box */}
      {!confirmMode && (
        <div className="border border-red-400 bg-red-50 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="text-red-500 w-6 h-6 mt-1" />
          <p className="text-red-700 text-sm">
            Suspending this profile will restrict all users assigned to it from using the platform until reactivated.
          </p>
        </div>
      )}

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 border border-indigo-300">
            <ClipboardList className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-800">{profile.roleName}</div>
            <div className="text-gray-500 text-sm">Profile ID: {profile.profileId}</div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 gap-y-4 gap-x-8 text-gray-700 text-sm">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
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

      {/* What Happens Section */}
      {!confirmMode && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
              What happens when you suspend this profile?
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <span>All users assigned to this profile will lose access to the system.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <span>The profile cannot be assigned to new users until reactivated.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <span>Profile information and history will be preserved.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-50 mt-10">
        {confirmMode ? (
          <>
            <button
              className="w-60 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
              onClick={handleSuspend}
            >
              Confirm Suspend
            </button>
            <button
              className="w-60 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
              onClick={() => setConfirmMode(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="w-60 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
              onClick={() => setConfirmMode(true)}
            >
              Suspend
            </button>
            <button
              className="w-60 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SuspendProfile;
