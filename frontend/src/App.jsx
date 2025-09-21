// import React, { useEffect, useState } from "react";
// import { fetchBorrowers, createBorrower, createLoan, predict } from "./api";
// import BorrowerList from "./components/BorrowerList";
// import Dashboard from "./components/Dashboard";
// import LoanForm from "./components/LoanForm";
// import PredictionPanel from "./components/PredictionPanel";

// export default function App() {
//   const [borrowers, setBorrowers] = useState([]);
//   useEffect(() => {
//     load();
//   }, []);
//   async function load() {
//     try {
//       const data = await fetchBorrowers();
//       setBorrowers(data);
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Microfinance Impact Forecasting</h1>
//       <div style={{ display: "flex", gap: 20 }}>
//         <div style={{ flex: 1 }}>
//           <BorrowerList borrowers={borrowers} onRefresh={load} />
//           <LoanForm onCreated={load} />
//         </div>
//         <div style={{ flex: 2 }}>
//           <Dashboard />
//           <PredictionPanel />
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useEffect, useState } from "react";
import { fetchBorrowers } from "./api";
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <h1 className="text-2xl font-bold text-indigo-600">
            Microfinance <span className="text-gray-800">Impact</span>
          </h1>

          {/* Nav links */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <a
              href="#dashboard"
              className="hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#borrowers"
              className="hover:text-indigo-600 transition-colors"
            >
              Borrowers
            </a>
            <a
              href="#predictions"
              className="hover:text-indigo-600 transition-colors"
            >
              Predictions
            </a>
          </nav>

          {/* Action button */}
          <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
            + New Loan
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel */}
          <div className="space-y-8">
            {/* Borrowers */}
            <section
              id="borrowers"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Borrowers
              </h2>
              <BorrowerList borrowers={borrowers} onRefresh={load} />
            </section>

            {/* Loan Form */}
            <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Add Loan
              </h2>
              <LoanForm onCreated={load} />
            </section>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Dashboard */}
            <section
              id="dashboard"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Dashboard
              </h2>
              <Dashboard />
            </section>

            {/* Predictions */}
            <section
              id="predictions"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Prediction Panel
              </h2>
              <PredictionPanel />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Microfinance Impact Project
        </p>
      </footer>

    </div>
  );
}
