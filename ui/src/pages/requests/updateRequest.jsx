import React, { useEffect, useState } from 'react';
import apiClient from '../../api';
import { useParams } from 'react-router-dom';

const UpdateRequest = () => {
    const {requestId} = useParams();

    const [categories, setCategories] = useState([]);
    const [form, setFormData] = useState({
        requestId: "",
        categoryId: "",
        title: "",
        description: "",
        status: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequestData = async () => {
            try{

                const categoriesResponse = await apiClient.get("/requestCategory/getAllCategories");
                const categoryData = categoriesResponse.data.data.map(c => ({
                    id: c.categoryId,
                    name: c.Name
                }));
                setCategories(categoryData);

                const response = await apiClient.get(`/request/getRequestInfo/${requestId}`);
                const requestInfo = response.data.data.requestInfo[0];
                setFormData({
                    categoryId: requestInfo.categoryId,
                    title: requestInfo.title,
                    description: requestInfo.description
                });
            }
            catch(e){
                console.log(e)
            }
            finally {
                setLoading(false);
            }
        }

        fetchRequestData();
    }, [])

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e){
        e.preventDefault();
        console.log("Create request payload: ", form);

        const requestBody = {
            request: {
                requestId: requestId,
                categoryId: form.categoryId,
                title: form.title,
                description: form.description
            }
        }

        try{
            const response = await apiClient.post("/request/updateRequest", requestBody);
            console.log(response);
        }
        catch (e){
            console.error(e);
        }
        finally{
            // Navigate to success page
        }
    }

    if (loading) return <div className="p-4 text-gray-500">Loading…</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-3xl font-semibold text-gray-900">Update Request</h1>
                <p className="mt-1 text-gray-600">
                    Update your Request Details
                </p>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-indigo-600 font-semibold text-lg">Request Information</h2>

                    <div className="mt-4 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Request Title
                            </label>
                            <input 
                                type="text"
                                value={form.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Title"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Request Description
                            </label>
                            <textarea
                                rows={3}
                                value={form.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Description"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <div className="relative mt-1">
                                    <select
                                        value={form.categoryId}
                                        onChange={(e) => handleInputChange("categoryId", e.target.value)}
                                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200">
                                            <option value="" disabled>
                                                Select category
                                            </option>
                                            {
                                                categories.map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                        {c.name}
                                                    </option>
                                                ))
                                            }
                                    </select>
                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        ▾
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button 
                            onClick={handleSubmit}
                            className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-200">
                                Update Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateRequest;