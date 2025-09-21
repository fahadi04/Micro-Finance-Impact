import React, { useEffect, useState } from 'react'
import api from '../api'
import BorrowerList from './BorrowerList'
import PredictionPanel from './PredictionPanel'

export default function Dashboard() {
    const [loans, setLoans] = useState([])
    const [borrowers, setBorrowers] = useState([])

    useEffect(() => {
        api.get('/loans/').then(r => setLoans(r.data))
        api.get('/borrowers/').then(r => setBorrowers(r.data))
    }, [])

    return (
        <div>
            <BorrowerList borrowers={borrowers} />
            <h2>Loans</h2>
            <ul>
                {loans.map(l => (
                    <li key={l.id}>
                        {l.amount} — <PredictionPanel loan={l} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
