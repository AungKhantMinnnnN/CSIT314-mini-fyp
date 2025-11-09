import React, { useState, useEffect } from "react";
import { AlertTriangle, FileText, FolderOpen, XCircle, ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api/index.js";

const SuspendCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [confirmMode, setConfirmMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch category info
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await apiClient.post("/platform/getCategory", { categoryId });
        const result = response.data.data.category;
        setCategory(result);
      } catch (error) {
        console.error("Failed to fetch category info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleSuspend = async () => {
    try {
      const requestBody = {
        category: {
          categoryId: category.categoryId,
          statusId: category.statusId,
        },
      };

      const response = await apiClient.post("/platform/suspend-category", requestBody);
      const result = response.data.data;

      if (!result.category.isCategorySuspended) {
        alert(result.message || "Category is already suspended.");
        return;
      }

      console.log("Suspension result:", result);
      navigate("/dashboard/platformmanagement/suspend-success", {
        state: { category },
      });
    } catch (error) {
      console.error("Error suspending category:", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Loading category data...</div>;
  }

  if (!category) {
    return <div className="p-8 text-red-500">Category not found.</div>;
  }

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-1">
          <XCircle className="w-7 h-7 text-red-500" />
          {confirmMode ? "Confirm Suspend" : "Suspend Category"}
        </h1>
        <p className="text-gray-500 mb-6">
          {confirmMode
            ? `Are you sure you want to suspend the category "${category.Name}"? This will disable access to it.`
            : "Temporarily disable this category from being used in the platform."}
        </p>
      </div>

      {/* Warning Box */}
      {!confirmMode && (
        <div className="border border-red-400 bg-red-50 rounded-xl p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="text-red-500 w-6 h-6 mt-1" />
          <p className="text-red-700 text-sm">
            Suspending this category will make it unavailable for new requests or use until reactivated.
          </p>
        </div>
      )}

      {/* Category Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 border border-indigo-300">
            <FolderOpen className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-800">{category.Name}</div>
            <div className="text-gray-500 text-sm">Category ID: {category.categoryId}</div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 gap-y-4 text-gray-700 text-sm">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
            <p>{category.Description || "No description provided."}</p>
          </div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-gray-500" />
            Status:{" "}
            {category.statusId === 1 ? (
              <span className="text-green-600 font-medium">Active</span>
            ) : (
              <span className="text-red-600 font-medium">Suspended</span>
            )}
          </div>
        </div>
      </div>

      {/* What Happens Section */}
      {!confirmMode && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
              What happens when you suspend this category?
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <span>Requests or programs linked to this category may become inactive.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <span>This category cannot be assigned to new activities until reactivated.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <span>Category information and history will remain intact.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-10 mt-10">
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

export default SuspendCategory;
