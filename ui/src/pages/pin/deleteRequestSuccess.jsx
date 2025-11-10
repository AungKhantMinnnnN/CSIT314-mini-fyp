import React from "react";
import { Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteRequestSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get deleted request object from navigation state
  const request = location.state?.request;

  if (!request) {
    return (
      <div className="p-8 text-red-500">
        No request data found. Go back to{" "}
        <button onClick={() => navigate(-1)} className="text-blue-500 underline">
          previous page
        </button>
        .
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen items-center">
      {/* Success Title */}
      <div className="flex flex-col items-center mb-8">
        <Trash2 className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Request Deleted Successfully
        </h1>
        <p className="text-gray-500 text-center">
          The request has been removed from the system.
        </p>
      </div>

      {/* Deleted Request Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <div className="flex flex-col gap-2 text-gray-700 text-sm">
          <div>
            <span className="font-semibold text-gray-800">Title: </span>
            {request.title || "N/A"}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Request ID: </span>
            {request.requestId || "N/A"}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Category: </span>
            {request.RequestCategory?.Name || "N/A"}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-10 mt-10">
        <button
          className="w-60 bg-red-500 hover:bg-red-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
          onClick={() => navigate("/dashboard/pin")}
        >
          Back to View Requests
        </button>
      </div>
    </div>
  );
};

export default DeleteRequestSuccess;
