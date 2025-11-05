import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from "../../../api/index.js";
import { UserCircle2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { userId } = useParams();

  // state
  const [formData, setFormData] = useState({
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: 1,
    username: '',
    password: ''
  });

  const [user, setUser] = useState(null);
  const [roleText, setRoleText] = useState('');
  const navigate = useNavigate();

  // roles
  const roles = [
    { RoleId: 1, RoleDescription: "Person In Need" },
    { RoleId: 2, RoleDescription: "CSR Representative" },
    { RoleId: 3, RoleDescription: "User Admin" },
    { RoleId: 4, RoleDescription: "Platform Management" }
  ];

  // fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.post("/user/getUserInfo", { userId });
        const userData = response.data.data.user;

        setFormData({
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
          username: userData.username,
          password: userData.password
        });

        setUser(userData);

        // determine role text
        let r;
        switch (userData.userProfileId) {
          case 1:
            r = "Person In Need";
            break;
          case 2:
            r = "CSR Representative";
            break;
          case 3:
            r = "User Admin";
            break;
          case 4:
            r = "Platform Management";
            break;
          default:
            r = "Unknown";
        }
        setRoleText(r);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // submit update
  const handleSubmit = async () => {
    const requestBody = {
      user: {
        userId: formData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        userProfileId: formData.role
      }
    };

    try {
        const response = await apiClient.post("/user/update-user", requestBody);
        console.log(response);

        navigate("/dashboard/update-success", { state: { user: response.data.data } });
    } catch (error) {
        console.error(error);
    }
  };

  // UI
  return (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Page Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <UserCircle2 className="w-7 h-7 text-indigo-600" />
        Update User Information
      </h1>
      <p className="text-gray-600 mb-8">
        Modify user details & permissions
      </p>

      {/* Profile Summary */}
      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-2">
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`}
              alt="Profile"
              className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
              <div className="text-xl font-semibold text-gray-800">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="text-gray-500 text-sm capitalize">
                {roleText}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <h2 className="text-lg font-medium text-indigo-600 mb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Email below name */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* User Details */}
      <h2 className="text-lg font-medium text-indigo-600 mb-4">
        User Details
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {roles.map((r) => (
              <option key={r.RoleId} value={r.RoleId}>
                {r.RoleDescription}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Password Section */}
      <h2 className="text-lg font-medium text-indigo-600 mb-4">Password</h2>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
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
    </div>
  </div>
);
}

export default UpdateUser;
