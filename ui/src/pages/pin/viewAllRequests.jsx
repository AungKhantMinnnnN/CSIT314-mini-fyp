import React , { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import StatCard from '../../components/StatCard';
import RequestCard from '../../components/RequestCard';
import apiClient from '../../api';
import { Search } from "lucide-react";

const ViewAllRequests = () => {

    const [userRole, setUserRole] = useState();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalRequests: 0,
        totalViews: 0,
        totalInterests: 0,
    });
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchRequestData(){
            let requests = [];
            try{
                const user = JSON.parse(localStorage.getItem("user"));
                const userId = user.userId;
                const userProfileId = user.userProfileId;
                setUserRole(userProfileId);

                if (userProfileId == 1){
                    // PIN
                    if (!searchQuery){
                        const response = await apiClient.get(`/request/getAllRequestsForUser/${userId}`);

                        requests = response.data.data.requests;
                        setRequests(requests);
                        setStats({
                            totalRequests: requests.length,
                            totalViews: requests.reduce((sum, r) => sum + r.viewCount, 0),
                            totalShortlistedCount: requests.reduce((sum, r) => sum + r.shortlistCount, 0),
                        });
                    }else{
                        const response = await apiClient.get(`/request/PinSearchRequest`,
                            {params: {
                                searchQuery: searchQuery,
                                userId: userId
                            }}
                        );
                        console.log(response)
                        requests = response.data.data.requests;
                        setRequests(requests);
                        setStats({
                            totalRequests: requests.length,
                            totalViews: requests.reduce((sum, r) => sum + r.viewCount, 0),
                            totalShortlistedCount: requests.reduce((sum, r) => sum + r.shortlistCount, 0),
                        })
                    }
                }
                else if (userProfileId == 2){
                    // CSR
                    if (!searchQuery){
                        const res = await apiClient.get("/request/getAllRequest");
                        requests = res.data.data.requests;
                        setRequests(requests);
                    }else{
                        const response = await apiClient.get("/request/CsrSearchRequest", 
                            {params: {searchQuery: searchQuery}}
                        );
                        requests = response.data.data.result;
                        console.log(response);
                        setRequests(requests);
                    }
                }
            }
            catch (e){
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        }

        fetchRequestData();
    }, [searchQuery])

    

    if (loading) return <div className="p-4 text-gray-500">Loading…</div>;
    if (error)   return <div className="p-4 text-red-600">Error: {error}</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">View All Requests</h1>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="relative w-1/2">
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search requests using title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
                    />
                </div>
                <button className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-lg shadow hover:bg-indigo-200 transition"
                    onClick={() => navigate("/dashboard/pin/createRequest")}
                >
                Create
                </button>
            </div>

            {
                userRole === 1 && (
                    <div className="flex flex-wrap gap-4 mb-8">
                        <StatCard title="Total Requests" value={stats.totalRequests} />
                        <StatCard title="Total Views" value={stats.totalViews} />
                        <StatCard title="Total Shortlist" value={`${stats.totalShortlistedCount}`}/>
                    </div>
                )
            }
            

            <div className="grid md:grid-cols-2 gap-6">
                {
                    requests.map((request) => (
                    <RequestCard key={request.requestId} request={request} userRole={userRole} />
                ))}
            </div>
        </div>
    )
}

export default ViewAllRequests;