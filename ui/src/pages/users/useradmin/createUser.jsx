import { useState } from 'react';
import apiClient from "../../../api/index.js";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 1 // default to "Person In Need"
    });

  const roles = [
    { "RoleId": 1, "RoleDescription": "Person In Need" },
    { "RoleId": 2, "RoleDescription": "CSR Representative" },
    { "RoleId": 3, "RoleDescription": "User Admin" },
    { "RoleId": 4, "RoleDescription": "Platform Management" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    

    const requestBody = {
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        userProfileId: formData.role,
        userStatusId: 1,
      }
    };

    try {
      const response = await apiClient.post("/user/create-user", requestBody);
      console.log(response);
      navigate("/dashboard/create-success", { state: { user: response.data.data } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Page Header */}
        <div className="flex items-center gap-2 mb-2">
            <UserPlus className="w-7 h-7 text-indigo-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Add New User</h1>
        </div>
        <p className="text-gray-600">Create a brand new user and add them to the registry</p>

        <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-white rounded-lg shadow-sm p-8">

            {/* Personal Information */}
            <h2 className="text-lg font-medium text-indigo-600 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
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

            <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            {/* Login Details */}
            <h2 className="text-lg font-medium text-indigo-600 mb-4">Login Details</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                {roles.map(r => (
                    <option key={r.RoleId} value={r.RoleId}>{r.RoleDescription}</option>
                ))}
                </select>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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
                Create
            </button>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
