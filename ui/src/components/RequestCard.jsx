const RequestCard = ({request}) => {
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

            <div className="flex justify-between gap-2">
                <button className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition">
                View Details
                </button>
                <button className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-100 transition">
                Update
                </button>
                <button className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition">
                Suspend
                </button>
            </div>
        </div>
    )
}

export default RequestCard;