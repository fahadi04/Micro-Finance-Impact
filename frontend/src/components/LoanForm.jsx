// import React, { useState, useEffect } from "react";
// import { createLoan, fetchBorrowers } from "../api";

// export default function LoanForm({ onCreated }) {
//     const [borrowers, setBorrowers] = useState([]);
//     const [form, setForm] = useState({
//         borrower_id: "",
//         amount: "",
//         interest_rate: "",
//         duration_months: "",
//         purpose: ""
//     });
//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState("");
//     const [error, setError] = useState("");

//     // Fetch borrowers for dropdown
//     useEffect(() => {
//         async function loadBorrowers() {
//             try {
//                 const data = await fetchBorrowers();
//                 setBorrowers(data);
//             } catch {
//                 setBorrowers([]);
//             }
//         }
//         loadBorrowers();
//     }, []);

//     async function handleSubmit(e) {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         setSuccess("");
//         try {
//             await createLoan({
//                 ...form,
//                 amount: +form.amount || 0,
//                 interest_rate: +form.interest_rate || 0,
//                 duration_months: +form.duration_months || 0,
//             });
//             setSuccess("Loan successfully created.");
//             setForm({
//                 borrower_id: "",
//                 amount: "",
//                 interest_rate: "",
//                 duration_months: "",
//                 purpose: ""
//             });
//             if (onCreated) onCreated();
//         } catch {
//             setError("Failed to create loan. Check inputs and try again.");
//         }
//         setLoading(false);
//     }

//     return (
//         <div className="bg-white rounded-xl shadow p-5">
//             <h3 className="text-lg font-semibold text-indigo-700 mb-4">Add New Loan</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">Borrower</label>
//                     <select
//                         className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
//                         required
//                         value={form.borrower_id}
//                         onChange={e => setForm({ ...form, borrower_id: e.target.value })}
//                     >
//                         <option value="">Select Borrower</option>
//                         {borrowers.map(b => (
//                             <option key={b.borrower_id} value={b.borrower_id}>
//                                 {b.name || b.borrower_id}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-gray-700">Amount (₹)</label>
//                         <input
//                             type="number"
//                             min={1000}
//                             step={500}
//                             className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             placeholder="Amount"
//                             required
//                             value={form.amount}
//                             onChange={e => setForm({ ...form, amount: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-gray-700">Interest Rate (%)</label>
//                         <input
//                             type="number"
//                             min={0}
//                             step={0.1}
//                             className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             placeholder="e.g. 12.5"
//                             required
//                             value={form.interest_rate}
//                             onChange={e => setForm({ ...form, interest_rate: e.target.value })}
//                         />
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-gray-700">Duration (months)</label>
//                         <input
//                             type="number"
//                             min={1}
//                             max={60}
//                             className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             placeholder="Duration"
//                             required
//                             value={form.duration_months}
//                             onChange={e => setForm({ ...form, duration_months: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium mb-1 text-gray-700">Purpose</label>
//                         <input
//                             type="text"
//                             className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             placeholder="Loan purpose"
//                             value={form.purpose}
//                             onChange={e => setForm({ ...form, purpose: e.target.value })}
//                         />
//                     </div>
//                 </div>
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full sm:w-auto px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition disabled:opacity-50"
//                 >
//                     {loading ? "Adding..." : "Add Loan"}
//                 </button>
//                 {success && <div className="mt-2 text-green-600 text-sm">{success}</div>}
//                 {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
//             </form>
//         </div>
//     );
// }



import React, { useState, useEffect } from "react";
import { createLoan, fetchBorrowers } from "../api";

export default function LoanForm({ onCreated }) {
    const [borrowers, setBorrowers] = useState([]);
    const [form, setForm] = useState({
        borrower_id: "",
        amount: "",
        interest_rate: "",
        duration_months: "",
        purpose: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadBorrowers() {
            try {
                const data = await fetchBorrowers();
                setBorrowers(data);
            } catch {
                setBorrowers([]);
            }
        }
        loadBorrowers();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await createLoan({
                ...form,
                amount: +form.amount || 0,
                interest_rate: +form.interest_rate || 0,
                duration_months: +form.duration_months || 0,
            });
            setSuccess("Loan successfully created.");
            setForm({
                borrower_id: "",
                amount: "",
                interest_rate: "",
                duration_months: "",
                purpose: ""
            });
            if (onCreated) onCreated();
        } catch {
            setError("Failed to create loan. Check inputs and try again.");
        }
        setLoading(false);
    }

    return (
        <div className="bg-white rounded-xl shadow p-5 min-w-[320px]">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Add New Loan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Borrower</label>
                    <select
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                        required
                        value={form.borrower_id}
                        onChange={e => setForm({ ...form, borrower_id: e.target.value })}
                    >
                        <option value="">Select Borrower</option>
                        {borrowers.map(b => (
                            <option key={b.borrower_id} value={b.borrower_id}>
                                {b.name || b.borrower_id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Amount (₹)</label>
                        <input
                            type="number"
                            min={1000}
                            step={500}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Amount"
                            required
                            value={form.amount}
                            onChange={e => setForm({ ...form, amount: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Interest Rate (%)</label>
                        <input
                            type="number"
                            min={0}
                            step={0.1}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="e.g. 12.5"
                            required
                            value={form.interest_rate}
                            onChange={e => setForm({ ...form, interest_rate: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Duration (months)</label>
                        <input
                            type="number"
                            min={1}
                            max={60}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Duration"
                            required
                            value={form.duration_months}
                            onChange={e => setForm({ ...form, duration_months: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Purpose</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Loan purpose"
                            value={form.purpose}
                            onChange={e => setForm({ ...form, purpose: e.target.value })}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Loan"}
                </button>
                {success && <div className="mt-2 text-green-600 text-sm">{success}</div>}
                {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
            </form>
        </div>
    );
}
