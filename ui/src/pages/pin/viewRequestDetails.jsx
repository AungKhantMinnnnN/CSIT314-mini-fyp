import React, { useState, useEffect } from 'react'
import StatCard from '../../components/StatCard';
import apiClient from '../../api';
import { useParams } from 'react-router-dom';

const ViewRequestDetails = () => {
    const {requestId} = useParams();

    const [request, setRequest] = useState({
        title: "",
        category: "",
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
                totalViews: requestInfo.viewCount,
                totalShortlistCount: requestInfo.shortlistCount,
                description: requestInfo.description
            });
        }

        fetchRequestData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-6 py-8">
                <div className="mb-3">
                    <h1 className="text-2xl font-semibold text-gray-900">{request.title}</h1>
                    <div className="text-indigo-500 font-medium -mt-0.5">{request.category}</div>
                    <div className="mt-3 h-px bg-gray-200" />
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                    <StatCard title={"Views"} value={request.totalViews} />
                    <StatCard title={"Shortlist Count"} value={request.totalShortlistCount} />
                </div>

                <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                        <h2 className="text-gray-900 font-semibold">Request Details</h2>
                    </div>

                    <section className="mt-4">
                        <p className="text-sm font-medium text-gray-700">Description</p>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                            {request.description}
                        </p>
                    </section>

                    <div className="my-4 h-px bg-gray-200" />

                    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="font-medium text-gray-900">CSR Views</p>
                        <p className="mt-1 text-sm text-gray-700">
                            {request.totalViews} CSRs have shown interest in your request.
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            CSR Representatives may reach out to you directly to discuss collaboration opportunities.
                        </p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            className="w-80 rounded-lg bg-indigo-600 px-6 py-2.5 text-white font-medium shadow hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                            onClick={(() => window.history.back())} >
                                Back to requests
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewRequestDetails;