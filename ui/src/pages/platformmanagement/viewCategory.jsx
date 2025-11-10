import React, { useState, useEffect } from "react";
import {
  Search,
  FolderOpen,
  Edit,
  PlusCircle,
  Pause,
  HeartPulse,
  BookOpen,
  Users,
  Globe2,
  Layers,
  CheckCircle2,
  Ban,
  Boxes,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../api/index.js";

const ViewCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchCategories = async () => {
        setLoading(true);
        try {
          let categoryData = [];
          let statsData = [];

          if (!searchTerm) {
            const response = await apiClient.get("/platform/getAllCategories");
            categoryData = response.data?.data?.categories || [];
            statsData = response.data?.data?.categories || [];
          } else {
            const statsResponse = await apiClient.get("/platform/getAllCategories");
            statsData = statsResponse.data?.data?.categories || [];

            const response = await apiClient.get("/platform/searchCategory", {
              params: { query: searchTerm },
            });
            categoryData = response.data?.data?.categories || [];
          }

          categoryData.sort((a, b) => a.categoryId - b.categoryId);

          setCategories(categoryData);
          setStats(statsData);
          setError(null);
        } catch (err) {
          console.error("❌ Error fetching categories:", err);
          setError("Failed to fetch categories.");
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }, 400); // debounce 400ms

    return () => clearTimeout(handler); // cancel previous timeout on each keystroke
  }, [searchTerm]);


  // Icon selector based on category name
  const getCategoryIcon = (name) => {
    const lower = name?.toLowerCase() || "";
    if (lower.includes("medical"))
      return <HeartPulse className="w-8 h-8 text-red-500" />;
    if (lower.includes("education"))
      return <BookOpen className="w-8 h-8 text-blue-500" />;
    if (lower.includes("community"))
      return <Users className="w-8 h-8 text-green-500" />;
    if (lower.includes("global") || lower.includes("international"))
      return <Globe2 className="w-8 h-8 text-teal-500" />;
    return <FolderOpen className="w-8 h-8 text-gray-400" />;
  };



  // Stats
  const totalCategories = stats.length;
  const activeCategories = stats.filter((c) => c.statusId === 1).length;
  const suspendedCategories = stats.filter((c) => c.statusId !== 1).length;
  const totalServices = totalCategories; // placeholder if services = categories

  return (
    <div className="flex flex-col p-8 w-full bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Layers className="w-8 h-8 text-indigo-500" />
          <div>
            <div className="text-sm text-gray-500">Total Categories</div>
            <div className="text-2xl font-semibold text-gray-800">
              {totalCategories}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Active Categories</div>
            <div className="text-2xl font-semibold text-gray-800">
              {activeCategories}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Ban className="w-8 h-8 text-red-500" />
          <div>
            <div className="text-sm text-gray-500">Suspended Categories</div>
            <div className="text-2xl font-semibold text-gray-800">
              {suspendedCategories}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <Boxes className="w-8 h-8 text-yellow-500" />
          <div>
            <div className="text-sm text-gray-500">Total Services</div>
            <div className="text-2xl font-semibold text-gray-800">
              {totalServices}
            </div>
          </div>
        </div>
      </div>

      {/* Header with Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
        </div>

        <button
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => navigate("/dashboard/platformmanagement/create")}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Create Category</span>
        </button>
      </div>

      {/* Category Cards */}
      {loading ? (
        <div className="text-gray-500 text-center py-6">
          Loading categories...
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-6">{error}</div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.categoryId}
              className="bg-white shadow rounded-xl p-5 flex flex-col justify-between transition hover:shadow-md"
            >
              <div className="flex items-center gap-4 mb-3">
                {getCategoryIcon(category.Name)}
                <div>
                  <div className="font-semibold text-lg text-gray-800">
                    {category.Name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {category.Description}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <Link
                  to={`/dashboard/platformmanagement/update/${category.categoryId}`}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition"
                >
                  <Edit className="w-4 h-4" /> Edit
                </Link>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-red-100 text-sm text-red-600 transition cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/platformmanagement/suspend/${category.categoryId}`)
                  }
                >
                  <Pause className="w-4 h-4" /> Suspend
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-6">No categories found.</div>
      )}
    </div>
  );
};

export default ViewCategory;
