import React, { useEffect, useState } from "react";
import { fetchBorrowers, createBorrower, createLoan, predict } from "./api";
import BorrowerList from "./components/BorrowerList";
import Dashboard from "./components/Dashboard";
import LoanForm from "./components/LoanForm";
import PredictionPanel from "./components/PredictionPanel";

export default function App() {
  const [borrowers, setBorrowers] = useState([]);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const data = await fetchBorrowers();
      setBorrowers(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Microfinance Impact Forecasting</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <BorrowerList borrowers={borrowers} onRefresh={load} />
          <LoanForm onCreated={load} />
        </div>
        <div style={{ flex: 2 }}>
          <Dashboard />
          <PredictionPanel />
        </div>
      </div>
    </div>
  )
}
