import React, { useState } from "react";
import { createLoan } from "../api";

export default function LoanForm({ onCreated }) {
    const [form, setForm] = useState({ borrower_id: "", amount: 0, interest_rate: 12, term_months: 12, purpose: "" })

    async function submit(e) {
        e.preventDefault();
        await createLoan(form);
        setForm({ borrower_id: "", amount: 0, interest_rate: 12, term_months: 12, purpose: "" })
        onCreated();
    }

    return (
        <div>
            <h4>Create Loan</h4>
            <form onSubmit={submit}>
                <input placeholder="Borrower ID" value={form.borrower_id} onChange={e => setForm({ ...form, borrower_id: e.target.value })} />
                <input placeholder="Amount" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: +e.target.value })} />
                <input placeholder="Interest Rate" type="number" value={form.interest_rate} onChange={e => setForm({ ...form, interest_rate: +e.target.value })} />
                <input placeholder="Term months" type="number" value={form.term_months} onChange={e => setForm({ ...form, term_months: +e.target.value })} />
                <input placeholder="Purpose" value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />
                <button type="submit">Create Loan</button>
            </form>
        </div>
    )
}
