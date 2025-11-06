import React, { useState, useEffect } from "react";
import { AlertTriangle, User, Mail, Phone, Building, IdCard, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api/index.js";

const SuspendUser = () => {
    const navigate = useNavigate();
    const { userId, userStatusId} = useParams();
    const [user, setUser] = useState(null);
    const [confirmMode, setConfirmMode] = useState(false);
    const [loading, setLoading] = useState(true);

    // Load user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiClient.post("/user/getUserInfo", { userId });
                const result = response.data.data.user;
                setUser(result);
                console.log(result)
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handleSuspend = async () => {
        try {

        const requestBody = {
            user: {
                userId: user.userId,
                userStatusId: user.userStatusId
            }
        };
    
        const response = await apiClient.post("/user/suspend-user", requestBody);
        const result = response.data.data

        if (!result.user.isUserSuspended) {
            alert(result.message || "User is already suspended.");
            return;
        }
        
        navigate("/dashboard/usermanagement/suspend-success", { state: { user } });

        } catch (error) {
            console.error("Error suspending user:", error);
        }
    };

    if (loading) {
        return <div className="p-8 text-gray-500">Loading user data...</div>;
    }

    if (!user) {
        return <div className="p-8 text-red-500">User not found.</div>;
    }

    var role; 
    switch (user.userProfileId){
        case 1: role = "Person In Need"; break;
        case 2: role = "CSR Representative"; break;
        case 3: role = "User Admin"; break;
        case 4: role = "Platform Management"; break;
        default: role = "Unknown";
    }

    return(
        <div className="flex flex-col p-8 bg-gray-50 min-h-screen">
        {/* Page Title */}
        <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800 mb-1">
                <XCircle className="w-7 h-7 text-red-500" />
                {confirmMode ? "Confirm Suspend" : "Suspend User Account"}
            </h1>
            <p className="text-gray-500 mb-6">
            {confirmMode
                ? `Are you sure you want to suspend ${user.username}? This user will be immediately logged out and unable to access the platform.`
                : "Temporarily disable access for this user account."}
            </p>
        </div>

        {/* Warning Box */}
        {!confirmMode && (
            <div className="border border-red-400 bg-red-50 rounded-xl p-4 flex items-start gap-3 mb-6">
            <AlertTriangle className="text-red-500 w-6 h-6 mt-1" />
            <p className="text-red-700 text-sm">
                This user will be immediately logged out and unable to access the portal until reactivated.
            </p>
            </div>
        )}

        {/* User Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
            <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`}
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300"
            />
            <div>
                <div className="text-xl font-semibold text-gray-800">{user.firstName + " " + user.lastName}</div>
                <div className="text-gray-500 text-sm capitalize">{role}</div>
            </div>
            </div>

            <hr className="my-4" />

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-y-4 gap-x-8 text-gray-700 text-sm">
            
            <div className="flex items-center gap-2">
                <IdCard className="w-4 h-4 text-gray-500" /> User ID: {userId}
            </div>

            <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" /> {user.email}
            </div>

            </div>
        </div>

        {/* What happens section */}
        {!confirmMode && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
                What happens when you suspend this user?
            </h2>

            <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <span>User will be immediately logged out from all active sessions.</span>
                </li>
                <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <span>User will not be able to log in until reactivated.</span>
                </li>
                <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <span>User data and history will be preserved.</span>
                </li>
            </ul>
            </div>
            </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-50 mt-10">
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

export default SuspendUser;
