import React , { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard';
import RequestCard from '../../components/RequestCard';
import apiClient from '../../api';

const ViewAllRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);
    const [stats, setStats] = useState({
        totalRequests: 0,
        totalViews: 0,
        totalInterests: 0,
    });

    useEffect(() => {
        (async () => {
        try {
            const stored = JSON.parse(localStorage.getItem("user"));
            if (!stored?.userId) throw new Error("No userId in localStorage");

            const res = await apiClient.get(`/request/getAllRequestsForUser/${stored.userId}`);

            // ✅ Safely dig out data and coerce to array
            const reqsRaw = res?.data?.data?.requests;
            const reqs = Array.isArray(reqsRaw)
            ? reqsRaw
            : reqsRaw && typeof reqsRaw === "object"
                ? Object.values(reqsRaw) // handle object keyed by id
                : [];
            
            setRequests(reqs);

            setStats({
                totalRequests: reqs.length,
                totalViews: reqs.reduce((sum, r) => sum + r.viewCount, 0),
                totalShortlistedCount: reqs.reduce((sum, r) => sum + r.shortlistCount, 0),
            });
        } catch (e) {
            setError(e?.message || "Failed to fetch requests");
            setRequests([]); // keep it an array
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    if (loading) return <div className="p-4 text-gray-500">Loading…</div>;
    if (error)   return <div className="p-4 text-red-600">Error: {error}</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">View All Requests</h1>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <input
                type="text"
                placeholder="Search requests by title, description"
                className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
                />
                <button className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-lg shadow hover:bg-indigo-200 transition">
                Create
                </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
                <StatCard title="Total Requests" value={stats.totalRequests} />
                <StatCard title="Total Views" value={stats.totalViews} />
                <StatCard title="Total Shortlist" value={`${stats.totalShortlistedCount}`}/>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {
                    requests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                ))}
            </div>
        </div>
    )
}

export default ViewAllRequests;