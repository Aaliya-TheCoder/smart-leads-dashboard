import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            role: "sales",
        });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            await API.post(
                "/auth/register",
                formData
            );

            navigate("/");
        } catch (error: any) {

            console.log(error);

            alert(
                error.response?.data?.message
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="w-96 p-6 shadow-lg rounded-lg border"
            >
                <h1 className="text-3xl font-bold mb-5">

                    Register

                </h1>

                <input
                    type="text"

                    name="name"

                    placeholder="Name"

                    onChange={handleChange}

                    className="w-full border p-2 mb-4"
                />

                <input
                    type="email"

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                    className="w-full border p-2 mb-4"
                />

                <input
                    type="password"

                    name="password"

                    placeholder="Password"

                    onChange={handleChange}

                    className="w-full border p-2 mb-4"
                />

                <select
                    name="role"

                    onChange={handleChange}

                    className="w-full border p-2 mb-4"
                >
                    <option value="sales">
                        Sales
                    </option>

                    <option value="admin">
                        Admin
                    </option>
                </select>

                <button
                    className="bg-black text-white w-full p-2"
                >
                    Register
                </button>

            </form>
        </div>
    );
};


export default Register;