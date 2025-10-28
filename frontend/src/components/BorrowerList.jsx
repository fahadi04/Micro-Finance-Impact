import React, { useState } from "react";
import { createBorrower } from "../api";

export default function BorrowerList({ borrowers = [], onRefresh }) {
    const [form, setForm] = useState({
        name: "",
        age: "",
        business_type: "",
        monthly_income: ""
    });

    async function submit(e) {
        e.preventDefault();
        await createBorrower({
            ...form,
            age: +form.age || 0,
            monthly_income: +form.monthly_income || 0,
        });
        setForm({ name: "", age: "", business_type: "", monthly_income: "" });
        if (onRefresh) onRefresh();
    }

    return (
        <div className="bg-gray-50 rounded-xl p-5 shadow space-y-8">
            {/* Borrower List */}
            <div>
                <h3 className="text-lg font-semibold mb-3 text-indigo-700">Active Borrowers</h3>
                <ul className="divide-y divide-gray-200">
                    {(Array.isArray(borrowers) ? borrowers : []).length === 0
                        ? <li className="py-2 text-gray-400 italic">No borrowers yet.</li>
                        : borrowers.map(b => (
                            <li key={b.borrower_id} className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <span className="font-medium text-gray-800">{b.name || b.borrower_id}</span>
                                <span className="text-sm text-gray-600">
                                    {b.business_type} &nbsp;|&nbsp;
                                    <span className="text-gray-500">₹{b.monthly_income?.toLocaleString()}</span>
                                </span>
                            </li>
                        ))}
                </ul>
            </div>

            {/* Borrower Add Form */}
            <div>
                <h4 className="text-base font-semibold mb-3 text-indigo-600">Add New Borrower</h4>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Full Name"
                            value={form.name}
                            required
                            onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Age"
                            type="number"
                            min={18}
                            value={form.age}
                            required
                            onChange={e => setForm({ ...form, age: e.target.value })}
                        />
                        <input
                            className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Business Type"
                            value={form.business_type}
                            required
                            onChange={e => setForm({ ...form, business_type: e.target.value })}
                        />
                        <input
                            className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Monthly Income"
                            type="number"
                            min={0}
                            step={100}
                            value={form.monthly_income}
                            required
                            onChange={e => setForm({ ...form, monthly_income: e.target.value })}
                        />
                    </div>
                    <button type="submit"
                        className="mt-2 w-full sm:w-auto bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 font-semibold transition"
                    >
                        Add Borrower
                    </button>
                </form>
            </div>
        </div>
    );
}
