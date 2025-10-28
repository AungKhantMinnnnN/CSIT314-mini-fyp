import { useState } from 'react';
import apiClient from "../../api/index.js";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: 1,
        username: '',
        password: ''
    });

    const roles = [
        {"RoleId" : 1, "RoleDescription" : "Person In Need"},
        {"RoleId" : 2, "RoleDescription" : "CSR Representative"},
        {"RoleId" : 3, "RoleDescription" : "User Admin"},
        {"RoleId" : 4, "RoleDescription" : "Platform Management"}
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async () => {
        const requestBody = {
            user: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: 1,
                username: formData.username,
                password: formData.password
            }
        }

        try{
            const response = await apiClient.post("/user/create-user", requestBody);
            console.log(response);
        }
        catch (error){
            console.error(error);
        }
    }

    return(
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Add New User</h1>
                <p className="text-gray-600 mb-8">Create a brand new user and add them to the registry</p>

                <div>
                    <div className="mb-8">
                        <h2 className="text-lg font-medium text-indigo-600 mb-4">Personal Information</h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email "
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                                {
                                    roles.map((role) => (
                                        <option key={role.RoleDescription} value={role.RoleId}>
                                            {role.RoleDescription}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <h2 className="text-lg font-medium text-indigo-600 mb-4">Login Details</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex pt-6">
                        <button 
                            onClick={handleSubmit}
                            className="px-32 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                            CREATE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;