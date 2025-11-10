import React, { useState, useEffect } from 'react';
import apiClient from '../../api';
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewCompletedRequest = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [completedRequests, setCompletedRequests] = useState([]);
    const [stats, setStats] = useState({
        totalCompletedRequests : 0
    })
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCompletedRequests(){

            const userId = JSON.parse(localStorage.getItem("user")).userId;
            let requestResponse = [];
            try{
                if (!searchQuery){
                    const response = await apiClient.get(`/completedRequest/getAllCompletedRequest/${userId}`);
                    requestResponse = response.data.data;
                }
                else{
                    const response = await apiClient.get('/completedRequest/searchCompletedRequest', {
                        params: {
                            searchQuery: searchQuery,
                            userId: userId
                        }
                    });
                    requestResponse = response.data.data;
                }
                requestResponse.sort((a, b) => a.completedId - b.completedId);
                setCompletedRequests(requestResponse);
                setStats({
                    totalCompletedRequests: requestResponse.length
                });
            }
            catch(e){
                console.error(e);
            }
            finally{
                setLoading(false);
            }
        }

        fetchCompletedRequests();
    }, [searchQuery])

    function handleOnClickViewDetails(requestId) {
        navigate(`/dashboard/pin/viewRequestDetail/${requestId}`);
    }

    if (loading) return <div className="p-4 text-gray-500">Loading…</div>

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <h1 className="text-2xl font-semibold text-slate-900">History</h1>
                <div className="mt-2 h-px bg-slate-200" />

                <div className="mt-6">
                    <div className="relative w-1/2">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search completed requests..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
                        />
                    </div>
                </div>

                <div className="flex-1 min-w-[240px] rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-700">Completed Requests</p>
                    </div>
                    <div className="mt-1 text-xl font-semibold text-slate-900">{stats.totalCompletedRequests}</div>
                </div>

                <div className="flex items-center">
                    {
                        completedRequests.map((r) => (
                            <div
                                key={r.Request.requestId}
                                className="rounded-xl border border-slate-300 bg-white p-4 shadow-sm">

                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-slate-900">
                                    {r.Request?.title}
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                    {r.Request?.description}
                                    </p>
                                </div>
                                <div className="ml-0 sm:ml-auto mt-2 sm:mt-0">
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                    Category : {r.Request?.RequestCategory?.Name}
                                    </span>
                                </div>
                            </div>

                                <button 
                                    className="mt-3 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition"
                                    onClick={() => handleOnClickViewDetails(r.Request.requestId)}>
                                    View Details
                                </button>
                            </div>
                        ))
                    }

                    {
                        completedRequests.length === 0 && (
                            <div className="rounded-xl border bord`er-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                                No completed requests match “{searchQuery}”.
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewCompletedRequest;