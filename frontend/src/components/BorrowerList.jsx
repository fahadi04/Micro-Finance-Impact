import React, { useState } from "react";
import { createBorrower } from "../api";

export default function BorrowerList({ borrowers, onRefresh }) {
    const [form, setForm] = useState({ name: "", age: 0, business_type: "", monthly_income: 0 })
    async function submit(e) {
        e.preventDefault();
        await createBorrower(form);
        setForm({ name: "", age: 0, business_type: "", monthly_income: 0 });
        onRefresh();
    }
    return (
        <div>
            <h3>Borrowers</h3>
            <ul>
                {borrowers.map(b => <li key={b.borrower_id}>{b.name || b.borrower_id} — {b.business_type} — ₹{b.monthly_income}</li>)}
            </ul>

            <h4>Add borrower</h4>
            <form onSubmit={submit}>
                <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Age" type="number" value={form.age} onChange={e => setForm({ ...form, age: +e.target.value })} />
                <input placeholder="Business type" value={form.business_type} onChange={e => setForm({ ...form, business_type: e.target.value })} />
                <input placeholder="Monthly income" type="number" value={form.monthly_income} onChange={e => setForm({ ...form, monthly_income: +e.target.value })} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
