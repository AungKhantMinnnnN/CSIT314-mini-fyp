import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserCog, Pencil } from "lucide-react";
import apiClient from "../../../api/index.js";

const UpdateUserProfile = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();

  // state
  const [formData, setFormData] = useState({
    profileId: 0,
    roleName: "",
    description: "",
    userProfileStatusId: 1,
    permission: ""
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.post("/user/getUserProfile", { profileId });
        const profileData = response.data.data.userProfile;
        console.log(profileData)

        setFormData({
          profileId: profileData.profileId,
          roleName: profileData.roleName,
          description: profileData.description || "",
          userProfileStatusId: profileData.userProfileStatusId,
          permission: profileData.permissions
        });

        setProfile(profileData);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // submit update
  const handleSubmit = async () => {
    const requestBody = {
        userProfile: {
            profileId: profileId,
            roleName: formData.roleName,
            description: formData.description,
            userProfileStatusId: 1,
            permission: formData.permission
        }
    };

    try {
      const response = await apiClient.post("/user/update-profile", requestBody);
      console.log(response);

      navigate("/dashboard/userprofiles/update-success", {
        state: { userProfile: response.data.data.userProfile }
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  // UI
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Page Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <UserCog className="w-7 h-7 text-indigo-600" />
          Update User Profile
        </h1>
        <p className="text-gray-600 mb-8">Modify role name and description</p>

        {loading ? (
          <div className="text-gray-500 text-center py-6">Loading profile...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-6">{error}</div>
        ) : (
          <>
            {/* Profile Summary */}
            {profile && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <UserCog className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-800">
                      {profile.roleName}
                    </div>
                    <div className="text-gray-500 text-sm">
                      Profile ID: {profile.profileId}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Editable Fields */}
            <h2 className="text-lg font-medium text-indigo-600 mb-4">
              Profile Information
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Name
                </label>
                <input
                  type="text"
                  name="roleName"
                  placeholder="Enter role name"
                  value={formData.roleName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

            </div>

            <div className="mb-10">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter profile description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Permissions
                </label>
                <input
                  type="text"
                  name="permission"
                  placeholder="Enter role permission (eg. Read, Read/Write)"
                  value={formData.permission}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-36 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <Pencil className="w-5 h-5" />
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateUserProfile;
