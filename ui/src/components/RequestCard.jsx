import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/index";
import { showErrorDialog } from "./ShowErrorDialog";

const RequestCard = ({ request, userRole }) => {
    const navigate = useNavigate();
    const [shortlisted, setShortlisted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shortlistCount, setShortlistCount] = useState(request.shortlistCount || 0);

    function handleOnClickViewDetails() {
        navigate(`/dashboard/pin/viewRequestDetail/${request.requestId}`);
    }

    function handleOnClickUpdate() {
        navigate(`/dashboard/pin/updateRequest/${request.requestId}`);
    }

    function handleOnClickDelete() {
        navigate(`/dashboard/pin/deleteRequest/${request.requestId}`);
    }

    async function handleOnClickShortlist(e) {
        e.preventDefault();
        if (loading || shortlisted) return;

        try {
            setLoading(true);

            const csrUserId = JSON.parse(localStorage.getItem("user")).userId;
            const requestBody = {
                csrUserId,
                shortlist: request,
            };

            const response = await apiClient.post("/shortlist/addShortlist", requestBody);
            console.log("Shortlist response:", response.data);

            if (response.data.success){
                // Update local state
                setShortlisted(true);
                setShortlistCount((prev) => prev + 1);
            }
            else{
                showErrorDialog("Failed to add request to shortlist.");
                return;
            }
            
        } catch (err) {
            console.error("Error shortlisting request:", err);
            showErrorDialog("Failed to add request to shortlist.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between transition hover:shadow-md">
        <div>
            <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-gray-800">{request.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">{request.description}</p>
        </div>

        <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {request.RequestCategory?.Name}
            </span>
            <span
            className={`text-xs ${
                request.RequestStatus?.statusId === 1
                ? "text-green-600"
                : request.RequestStatus?.statusId === 2
                ? "text-yellow-600"
                : "text-gray-600"
            }`}
            >
            {request.RequestStatus?.statusName}
            </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-2">
            <span>Views: {request.viewCount}</span>
            <span>Shortlisted: {shortlistCount}</span>
            </div>
        </div>

        {userRole === 1 ? (
            <div className="flex justify-between gap-2">
            <button
                className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
                onClick={handleOnClickViewDetails}
            >
                View Details
            </button>
            <button
                className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100 transition"
                onClick={handleOnClickUpdate}
            >
                Update
            </button>
            <button
                className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                onClick={handleOnClickDelete}
            >
                Delete
            </button>
            </div>
        ) : (
            <div className="flex justify-between gap-2">
            <button
                className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
                onClick={handleOnClickViewDetails}
            >
                View Details
            </button>
            <button
                className={`text-sm px-3 py-1 rounded transition font-medium ${
                shortlisted
                    ? "bg-green-500 text-white cursor-default"
                    : loading
                    ? "bg-indigo-200 text-indigo-700 cursor-wait"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
                onClick={handleOnClickShortlist}
                disabled={shortlisted || loading}
            >
                {loading
                ? "Processing..."
                : shortlisted
                ? "Shortlisted ✓"
                : "Shortlist"}
            </button>
            </div>
        )}
        </div>
    );
};

export default RequestCard;
