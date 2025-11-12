import React, { useEffect, useState } from 'react';
import apiClient from '../../api';
import { useNavigate } from "react-router-dom";
import { showErrorDialog } from '../../components/ShowErrorDialog';

const CreateRequest = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [form, setFormData] = useState({
        userId: "",
        categoryId: "",
        title: "",
        description: "",
        status: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await apiClient.get("platform/getAllCategories");
                const categoryData = res.data.data.categories.map(c => ({
                    id: c.categoryId,
                    name: c.Name
                }));
                setCategories(categoryData);
            } catch (e) {
                console.error(e);
                showErrorDialog(e.message);
            } 
            finally{
                setLoading(false);
            }
        })();
    }, []);

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e){
        e.preventDefault();

        const stored = JSON.parse(localStorage.getItem("user"));
        const userId = stored.userId;

        form.userId = userId;
        form.status = 1;

        console.log("Create request payload: ", form);

        const requestBody = {
            request: {
                userId: form.userId,
                categoryId: form.categoryId,
                title: form.title,
                description: form.description
            }
        }

        try{
            const response = await apiClient.post("/request/createRequest", requestBody);
            console.log(response);
            if(response.data.success){
                navigate("/dashboard/pin/create-success", { 
                    state: { request: response.data.data.createdRequest } 
                });
            }
            else{
                showErrorDialog("Failed to create new request.");
                return;
            }
        }
        catch (e){
            console.error(e);
            showErrorDialog("Failed to create new request.");
        }
    }

    if (loading) return <div className="p-4 text-gray-500">Loading…</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-3xl font-semibold text-gray-900">Create new request</h1>
                <p className="mt-1 text-gray-600">
                    Submit a new request to connect with CSR organizations
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
                                Create Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRequest;