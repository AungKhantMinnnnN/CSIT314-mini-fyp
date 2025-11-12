import React, { useState, useEffect } from 'react';
import apiClient from '../../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { showErrorDialog } from '../../components/ShowErrorDialog';

const DeleteRequest = () => {
    const navigate = useNavigate();
    const {requestId} = useParams();
    const [request, setRequest] = useState({
        title: "",
        category: "",
        status: "",
        totalViews: 0,
        totalShortlistCount: 0,
        description: ""
    });

    useEffect(() => {
        const fetchRequestData = async () => {
            const response = await apiClient.get(`/request/getRequestInfo/${requestId}`);
            const requestInfo = response.data.data.requestInfo[0];

            setRequest({
                title: requestInfo.title,
                category: requestInfo.RequestCategory.Name,
                status: requestInfo.RequestStatus.statusName,
                totalViews: requestInfo.viewCount,
                totalShortlistCount: requestInfo.shortlistCount,
                description: requestInfo.description
            });
        }

        fetchRequestData();
    }, []);

    const WarningIcon = (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M11 7h2v7h-2z"></path>
            <path d="M12 17a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 17z"></path>
            <path d="M10.29 3.86 1.82 18.03A2 2 0 0 0 3.57 21h16.86a2 2 0 0 0 1.75-2.97L13.71 3.86a2 2 0 0 0-3.42 0z" opacity=".2"/>
            <path d="M12 2.5a2.5 2.5 0 0 0-2.14 1.23L1.39 18.9A2.5 2.5 0 0 0 3.57 22h16.86a2.5 2.5 0 0 0 2.18-3.1L14.14 3.73A2.5 2.5 0 0 0 12 2.5Zm0 1.5c.18 0 .35.09.44.25l8.47 14.17A.5.5 0 0 1 20.43 19H3.57a.5.5 0 0 1-.44-.75L11.6 4.25c.09-.16.26-.25.44-.25Z"/>
        </svg>
    );

    async function submitDelete(e){
        e.preventDefault();
        try{
            const requestBody = {
                requestId: requestId
            }

            const response = await apiClient.post("/request/deleteRequest", requestBody);
            console.log(response);
            if(response.data.success){
                navigate("/dashboard/pin/delete-success", { 
                    state: { request: response.data.data.deletedRequest } 
                });
            }
            else{
                showErrorDialog("Failed to delete request.");
                return;
            }
        }
        catch (e){
            console.error(e);
            showErrorDialog("Failed to delete request.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-6 py-8">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-red-100 p-2 text-red-600">
                        <WarningIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Delete Request</h1>
                        <p className="text-sm text-gray-600">
                            Confirm deletion of your assistance request
                        </p>
                    </div>
                </div>

                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    <div className="flex items-start gap-3">
                        <WarningIcon className="mt-0.5 h-5 w-5" />
                        <div className="text-sm">
                        <p className="font-medium">Are you absolutely sure?</p>
                        <p>This action cannot be undone. This will permanently delete your request.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-gray-600">Request Title</div>
                    <div className="mt-0.5 text-gray-900 font-medium border-b pb-2">
                        {request.title}
                    </div>

                    <div className="mt-4 grid gap-6 sm:grid-cols-2">
                        <div>
                            <div className="text-xs text-gray-500">Category</div>
                            <div className="text-sm text-gray-800">{request.category}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">Status</div>
                            <div className="text-sm text-gray-800">{request.status}</div>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-6 sm:grid-cols-2">
                        <div>
                            <div className="text-xs text-gray-500">Views</div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-800">
                                {request.totalViews}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500">Shortlist</div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-800">
                                {request.totalShortlistCount} CSRs
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="text-gray-900 font-medium">
                            What happens when you delete this request?
                        </h3>

                        <ul className="mt-3 space-y-3 text-sm text-gray-700">
                            {[
                            "Your deletion request will be reviewed by our team within 3–5 working days",
                            "You’ll receive a notification once the review is complete and next steps are available",
                            "If donations or CSR contributions have already been made, our team will contact the CSR organization to verify and close the request appropriately",
                            "Other CSR organizations will no longer be able to view or respond to this request",
                            "This action is irreversible and cannot be undone",
                            ].map((t, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                !
                                </span>
                                <span>{t}</span>
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <button
                            onClick={submitDelete}
                            className="rounded-lg bg-red-600 px-6 py-2.5 font-medium text-white shadow hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200"
                        >
                            Delete Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DeleteRequest;