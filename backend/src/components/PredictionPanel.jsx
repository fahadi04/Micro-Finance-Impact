import React, { useState } from "react";
import { predict } from "../api";

export default function PredictionPanel() {
    const [borrowerId, setBorrowerId] = useState("");
    const [loanId, setLoanId] = useState("");
    const [result, setResult] = useState(null);
    async function doPredict(e) {
        e.preventDefault();
        const res = await predict({ borrower_id: borrowerId, loan_id: loanId });
        setResult(res);
    }
    return (
        <div>
            <h4>Predict outcomes</h4>
            <form onSubmit={doPredict}>
                <input placeholder="Borrower ID" value={borrowerId} onChange={e => setBorrowerId(e.target.value)} />
                <input placeholder="Loan ID (optional)" value={loanId} onChange={e => setLoanId(e.target.value)} />
                <button type="submit">Predict</button>
            </form>
            {result && (
                <div>
                    <h5>Result</h5>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
