import React from "react";
import { CheckCircle, FileText, FolderPlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateRequestSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get request object from navigation state
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
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Request Created Successfully
        </h1>
        <p className="text-gray-500 text-center">
          Your request has been submitted successfully. CSR representatives will review it soon.
        </p>
      </div>

      {/* Request Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <FolderPlus className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-800">
              {request.title}
            </div>
            <div className="text-gray-500 text-sm">
              Request ID: {request.requestId || "N/A"}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-y-4 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            {request.description || "No description provided."}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                request.status === 1
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {request.status === 1 ? "Active" : "Suspended"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            Category: {request.RequestCategory.Name || "N/A"}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-10 mt-10">
        <button
          className="w-60 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-md transition"
          onClick={() => navigate("/dashboard/pin")}
        >
          Back to View Requests
        </button>
      </div>
    </div>
  );
};

export default CreateRequestSuccess;