import { useState } from "react";
import apiClient from "../../../api/index.js";
import { IdCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showErrorDialog } from "../../../components/ShowErrorDialog.jsx";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
    userProfileStatusId: 1, // active by default
    permissions: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.roleName.trim()) {
      showErrorDialog("Role name cannot be empty.");
      return;
    }

    const requestBody = {
      userProfile: {
        roleName: formData.roleName,
        description: formData.description,
        userProfileStatusId: 1,
        permissions: formData.permissions
      },
    };

    try {
      const response = await apiClient.post("/user/create-profile", requestBody);
      

      navigate("/dashboard/userprofiles/create-success", {
        state: { profile: response.data.data.createdProfile },
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      const message =
        error.response?.data?.message ||
        error.message;
      showErrorDialog(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <IdCard className="w-7 h-7 text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Create New Profile</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Define a new user profile role and its description.
        </p>

        {/* Form */}
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Name
            </label>
            <input
              type="text"
              name="roleName"
              placeholder="e.g. CSR Representative"
              value={formData.roleName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the role's permissions or responsibilities"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Permissions
            </label>
            <input
              type="text"
              name="permissions"
              placeholder="e.g. Read, Read/Write"
              value={formData.permissions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 px-36 py-3 
                        bg-indigo-600 text-white font-medium rounded-md 
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 transition-colors"
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
