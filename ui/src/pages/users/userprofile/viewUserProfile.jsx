import React, { useState, useEffect } from "react";
import { Search, UserCog, Edit, PlusCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../../api/index.js";

const ViewUserProfile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.get("/profile/getAllProfiles");
        const profileData = response.data.data.profileInfo;
        setProfiles(profileData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((p) =>
    p.profileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col p-8 w-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
        </div>

        <button
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => navigate("/dashboard/profile/create")}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Create Profile</span>
        </button>
      </div>

      {/* Profiles List */}
      <div className="bg-white rounded-lg shadow p-4 divide-y divide-gray-200">
        {loading ? (
          <div className="text-gray-500 text-center py-6">Loading profiles...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-6">{error}</div>
        ) : filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile.profileId}
              className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg transition"
            >
              {/* Profile Info */}
              <div>
                <div className="font-semibold text-gray-800">
                  {profile.profileName}
                </div>
                <div className="text-gray-500 text-sm">{profile.description}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  to={`/dashboard/profile/update/${profile.profileId}`}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition"
                >
                  <Edit className="w-4 h-4" /> Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-6">No profiles found.</div>
        )}
      </div>
    </div>
  );
};

export default ViewUserProfile;
