import React, { useState } from 'react';

const CreateRequest = () => {
    
    const [categories, setCategories] = useState([]);
    const [form, setFormData] = useState({
        userId: "",
        categoryId: "",
        title: "",
        description: "",
        status: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e){
        e.preventDefault();
        console.log("Create request payload: ", form);
    }

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
                                
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRequest;