import { useState } from "react";
import apiClient from "../../api/index.js";
import { FolderPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showErrorDialog } from "../../components/ShowErrorDialog.jsx";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    statusId: 1, // active by default
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
    if (!formData.Name.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    const requestBody = {
      category: {
        Name: formData.Name,
        Description: formData.Description,
        statusId: 1,
      },
    };

    try {
      const response = await apiClient.post("/platform/create-category", requestBody);
      console.log("Category created:", response.data);

      if(response.data.success){
        navigate("/dashboard/platformmanagement/create-success", {
          state: { category: response.data.data.createdCategory },
        });
      }
      else{
        showErrorDialog("Failed to create category.");
        return;
      }
      
    } catch (error) {
      console.error("Error creating category:", error);
      showErrorDialog("Failed to create category.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <FolderPlus className="w-7 h-7 text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Create New Category</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Define a new service or content category for your platform.
        </p>

        {/* Form */}
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="Name"
              placeholder="e.g. Community Support"
              value={formData.Name}
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
              name="Description"
              placeholder="Describe the category's purpose or content"
              value={formData.Description}
              onChange={handleInputChange}
              rows={4}
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
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
