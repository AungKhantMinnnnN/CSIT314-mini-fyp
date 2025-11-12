import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FolderOpen, Pencil } from "lucide-react";
import apiClient from "../../api/index.js";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // state
  const [formData, setFormData] = useState({
    categoryId: 0,
    Name: "",
    Description: "",
    statusId: 1,
  });

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await apiClient.post("/platform/getCategory", { categoryId });
        const categoryData = response.data.data.category;
        console.log("Fetched category:", categoryData);

        setFormData({
          categoryId: categoryData.categoryId,
          Name: categoryData.Name,
          Description: categoryData.Description || "",
          statusId: categoryData.statusId,
        });

        setCategory(categoryData);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to load category details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit update
  const handleSubmit = async () => {
    const requestBody = {
      category: {
        categoryId: formData.categoryId,
        Name: formData.Name,
        Description: formData.Description,
        statusId: formData.statusId,
      },
    };

    try {
      const response = await apiClient.post("/platform/update-category", requestBody);
      console.log("Update response:", response);

      if(response.data.success){
        navigate("/dashboard/platformmanagement/update-success", {
          state: { category: response.data.data.updatedCategory },
        });
      }
      else{
        showErrorDialog("Failed to update category.");
        return;
      }
      
    } catch (err) {
      console.error("Error updating category:", err);
      showErrorDialog("Failed to update category.");
    }
  };

  // UI
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <FolderOpen className="w-7 h-7 text-indigo-600" />
          Update Category
        </h1>
        <p className="text-gray-600 mb-8">
          Modify category name and description
        </p>

        {loading ? (
          <div className="text-gray-500 text-center py-6">Loading category...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-6">{error}</div>
        ) : (
          <>
            {/* Category Summary */}
            {category && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FolderOpen className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-800">
                      {category.Name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      Category ID: {category.categoryId}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Editable Fields */}
            <h2 className="text-lg font-medium text-indigo-600 mb-4">
              Category Information
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="Name"
                  placeholder="Enter category name"
                  value={formData.Name}
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
                name="Description"
                placeholder="Enter category description"
                value={formData.Description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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

export default UpdateCategory;
