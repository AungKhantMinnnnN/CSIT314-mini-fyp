import { useNavigate } from "react-router-dom";
import apiClient from '../api/index';

const RequestCard = ({request, userRole}) => {
    const navigate = useNavigate();
    function handleOnClickViewDetails() {
        navigate(`/dashboard/pin/viewRequestDetail/${request.requestId}`);
    }

    function handleOnClickUpdate() {
        navigate(`/dashboard/pin/updateRequest/${request.requestId}`);
    }

    function handleOnClickDelete(){
        navigate(`/dashboard/pin/deleteRequest/${request.requestId}`);
    }

    async function handleOnClickShortlist(e){
        e.preventDefault();
        try{
            const csrUserId = JSON.parse(localStorage.getItem("user")).userId;
            const requestBody = {
                csrUserId: csrUserId,
                shortlist: request
            }

            const response = await apiClient.post("/shortlist/addShortlist", requestBody);
            console.log(response);
        }
        catch (e){
            console.error(e);
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-gray-800">{request.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{request.description}</p>
            </div>

            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{request.RequestCategory.Name}</span>
                <span
                    className={`text-xs ${
                    request.RequestStatus.statusId === 1
                        ? "text-green-600"
                        : request.RequestStatus.statusId === 2
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                >
                    {request.RequestStatus.statusName}
                </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-2">
                Views: {request.viewCount} <span>Shortlisted: {request.shortlistCount}</span>
                </div>
            </div>

            {
                userRole === 1 ? (
                    <div className="flex justify-between gap-2">
                    <button 
                        className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
                        onClick={handleOnClickViewDetails}>
                        View Details
                    </button>
                    <button 
                        className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100 transition"
                        onClick={handleOnClickUpdate}>
                    Update
                    </button>
                    <button className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                        onClick={handleOnClickDelete}>
                    Delete
                    </button>
                </div>
                ) : (
                    <div className="flex justify-between gap-2">
                        <button 
                            className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
                            onClick={handleOnClickViewDetails}>
                            View Details
                        </button>
                        <button 
                            className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100 transition"
                            onClick={handleOnClickShortlist}>
                        Shortlist
                        </button>
                    </div>
                )
            }

            
        </div>
    )
}

export default RequestCard;