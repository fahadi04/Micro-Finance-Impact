// import React, { useEffect, useState } from 'react'
// import api from '../api'
// import BorrowerList from './BorrowerList'
// import PredictionPanel from './PredictionPanel'

// export default function Dashboard() {
//     const [loans, setLoans] = useState([])
//     const [borrowers, setBorrowers] = useState([])

//     useEffect(() => {
//         api.get('/loans/').then(r => setLoans(r.data))
//         api.get('/borrowers/').then(r => setBorrowers(r.data))
//     }, [])

//     return (
//         <div>
//             <BorrowerList borrowers={borrowers} />
//             <h2>Loans</h2>
//             <ul>
//                 {loans.map(l => (
//                     <li key={l.id}>
//                         {l.amount} — <PredictionPanel loan={l} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import api from '../api';
import BorrowerList from './BorrowerList';
import PredictionPanel from './PredictionPanel';

export default function Dashboard() {
    const [loans, setLoans] = useState([]);
    const [borrowers, setBorrowers] = useState([]);

    useEffect(() => {
        api.get('/loans/').then(r => setLoans(r.data));
        api.get('/borrowers/').then(r => setBorrowers(r.data));
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-6 px-4 bg-white rounded-2xl shadow-md mb-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-2xl font-bold text-indigo-700">Microfinance Program Dashboard</h2>
                <span className="text-gray-500 text-sm mt-2 md:mt-0">
                    Data-driven insights for borrowers and loans
                </span>
            </div>

            <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Borrowers Overview</h3>
                <div className="bg-gray-50 rounded-xl shadow p-4">
                    <BorrowerList borrowers={borrowers} />
                </div>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Active Loans & Predictions</h3>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loans.map(l => (
                        <li
                            key={l.id}
                            className="bg-gray-50 rounded-xl shadow p-4 flex flex-col space-y-2 hover:shadow-lg transition"
                        >
                            <div className="text-indigo-700 font-bold text-lg flex items-center">
                                ₹{l.amount}
                                <span className="text-gray-700 font-normal ml-2">Loan ID: <span className="font-mono">{l.id}</span></span>
                            </div>
                            <div className="text-sm text-gray-700">
                                Borrower:&nbsp;
                                <span className="font-medium">
                                    {borrowers.find(b => b.id === l.borrower_id)?.name || l.borrower_id}
                                </span>
                            </div>
                            <div>
                                <PredictionPanel loan={l} />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
