import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import BorrowerList from "../components/BorrowerList";
import PredictionPanel from "../components/PredictionPanel";
import LoanForm from "../components/LoanForm";
import { fetchBorrowers } from "../api";

export default function HomePages() {
    const [borrowers, setBorrowers] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const data = await fetchBorrowers();
            setBorrowers(data);
        } catch (error) {
            setBorrowers([]);
        }
    }

    return (
        <>
            <div className="bg-gradient-to-tr from-gray-50 via-indigo-50 to-gray-100 mt-10">

            </div>
            <div className="min-h-screen  pb-12">

                <section className="max-w-6xl mx-auto bg-white rounded-2xl  py-12 px-8 flex flex-col md:flex-row items-center mb-10">
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Microfinance Impact Forecasting</h1>
                        <p className="text-lg text-gray-700 mb-4">
                            Empowering microfinance institutions with real-time, data-driven insights.
                            Our platform leverages machine learning and causal analytics to forecast loan impacts,
                            highlight repayment risks, and enable better lending decisions for low-income households
                            and small entrepreneurs.
                        </p>
                        <ul className="list-disc list-inside text-indigo-600 font-medium mb-4">
                            <li>Actionable predictions for MFIs</li>
                            <li>Early warning signals for repayment risk</li>
                            <li>Interactive, simulation-driven dashboard</li>
                            <li>True causal impact estimation</li>
                        </ul>
                    </div>
                    <div className="md:w-1/3 flex justify-center mt-8 md:mt-0">
                        <div className="rounded-full bg-indigo-600 p-8 flex items-center justify-center shadow-lg">
                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="20" />
                                <path d="M16 24l4 4 8-8" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
                        <h3 className="text-indigo-700 font-semibold mb-2">Prediction Engine</h3>
                        <p className="text-gray-700 text-sm">Forecast business survival, income changes, and repayment outcomes using advanced ML models.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
                        <h3 className="text-indigo-700 font-semibold mb-2">Causal Impact</h3>
                        <p className="text-gray-700 text-sm">Estimate true change from microfinance programs using state-of-the-art causal ML techniques.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
                        <h3 className="text-indigo-700 font-semibold mb-2">Risk Sensing</h3>
                        <p className="text-gray-700 text-sm">Automatic early alerts for at-risk borrowers to enable timely support and intervention.</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
                        <h3 className="text-indigo-700 font-semibold mb-2">Decision Dashboard</h3>
                        <p className="text-gray-700 text-sm">Simulate policies and lending strategies, track results, and visualize impact in interactive dashboards.</p>
                    </div>
                </section>

                {/* Main interactive app components */}
                <div className="flex-1 max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Panel: Borrowers & Add Loan */}
                        <div className="space-y-8">
                            <section id="borrowers" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Borrowers</h2>
                                <BorrowerList borrowers={borrowers} onRefresh={load} />
                            </section>
                            <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Loan</h2>
                                <LoanForm onCreated={load} />
                            </section>
                        </div>
                        {/* Right Panel: Dashboard & Prediction Panel */}
                        <div className="lg:col-span-2 space-y-8">
                            <section id="dashboard" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Dashboard</h2>
                                <Dashboard />
                            </section>
                            <section id="predictions" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Prediction Panel</h2>
                                <PredictionPanel />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
