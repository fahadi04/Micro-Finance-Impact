// import React, { useState } from "react";
// import { predict } from "../api";

// export default function PredictionPanel() {
//     const [borrowerId, setBorrowerId] = useState("");
//     const [loanId, setLoanId] = useState("");
//     const [result, setResult] = useState(null);
//     async function doPredict(e) {
//         e.preventDefault();
//         const res = await predict({ borrower_id: borrowerId, loan_id: loanId });
//         setResult(res);
//     }
//     return (
//         <div>
//             <h4>Predict outcomes</h4>
//             <form onSubmit={doPredict}>
//                 <input placeholder="Borrower ID" value={borrowerId} onChange={e => setBorrowerId(e.target.value)} />
//                 <input placeholder="Loan ID (optional)" value={loanId} onChange={e => setLoanId(e.target.value)} />
//                 <button type="submit">Predict</button>
//             </form>
//             {result && (
//                 <div>
//                     <h5>Result</h5>
//                     <pre>{JSON.stringify(result, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }



import React, { useState } from "react";
import { predict } from "../api";

export default function PredictionPanel() {
    const [borrowerId, setBorrowerId] = useState("");
    const [loanId, setLoanId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function doPredict(e) {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const res = await predict({ borrower_id: borrowerId, loan_id: loanId });
            setResult(res);
        } catch (err) {
            setResult({ error: "Prediction failed. Please check IDs and try again." });
        }
        setLoading(false);
    }

    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h4 className="text-lg font-semibold mb-4 text-indigo-700">Predict Loan Outcomes</h4>
            <form onSubmit={doPredict} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Borrower ID"
                    value={borrowerId}
                    required
                    onChange={e => setBorrowerId(e.target.value)}
                />
                <input
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Loan ID (optional)"
                    value={loanId}
                    onChange={e => setLoanId(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 font-semibold transition disabled:opacity-50"
                >
                    {loading ? "Predicting..." : "Predict"}
                </button>
            </form>
            {result && (
                <div className="bg-gray-100 rounded p-4 mt-2 text-gray-800">
                    <h5 className="font-semibold mb-1 text-indigo-600">Prediction Result</h5>
                    <pre className="text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
