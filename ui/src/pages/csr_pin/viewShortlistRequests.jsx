import React, { useState, useEffect } from 'react';
import apiClient from '../../api';
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewShortlistRequest = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [shortlistedRequests, setShortlistedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const userId = JSON.parse(localStorage.getItem("user")).userId;

        async function fetchShortlistData(){
            let requestResponse = [];
            try{
                if (!searchQuery){
                    const response = await apiClient.get(`/shortlist/getAllShortlist/${userId}`);
                    requestResponse = response.data.data;
                }
                else{
                    const response = await apiClient.get(`/shortlist/searchShortlist`, {
                        params: {
                            searchQuery: searchQuery,
                            userId: userId
                        }
                    });
                    requestResponse = response.data.data;
                }
                requestResponse.sort((a, b) => a.shortlistId - b.shortlistId);
                setShortlistedRequests(requestResponse);
            }
            catch (e){
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        }

        fetchShortlistData();
    }, [searchQuery]);

    function handleOnClickViewDetails(requestId) {
        navigate(`/dashboard/csr/viewRequestDetail/${requestId}`);
    }

    if (loading) return <div className="p-4 text-gray-500">Loading…</div>

    return(
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-3xl font-semibold text-slate-900">View all shortlisted requests</h1>
                <div className="mt-2 h-px bg-slate-200" />

                <div className="mt-6">
                    <div className="relative w-1/2">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search shortlist requests..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
                        />
                    </div>
                </div>

                <div className="mt-6 space-y-5">
                {shortlistedRequests.map((r) => (
                    <div
                        key={r.shortlistId}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-slate-900">
                            {r.Request?.title}
                        </h3>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                        {r.Request?.description}
                        </p>
                        <p className="mt-1 text-sm text-slate-60">
                            Notes: {r.notes}
                        </p>
                        <button 
                            className="mt-3 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
                            onClick={() => handleOnClickViewDetails(r.Request.requestId)}>
                            View Details
                        </button>
                    </div>
                ))}

                {
                    shortlistedRequests.length === 0 && (
                        <div className="rounded-xl border bord`er-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                            No shortlisted requests match “{searchQuery}”.
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default ViewShortlistRequest;