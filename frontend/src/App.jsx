// import React, { useEffect, useState } from "react";
// import { fetchBorrowers } from "./api";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import HomePages from "./pages/HomePages";

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
//     <div >
//       <Navbar />


//       <main>
//         <HomePages />
//       </main>

//       <Footer />
//     </div>
//   );
// }


import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LoanForm from "./components/LoanForm";
import Footer from "./components/Footer";
import HomePages from "./pages/HomePages";

export default function App() {
  const [showLoanModal, setShowLoanModal] = useState(false);

  return (
    < >
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar onNewLoan={() => setShowLoanModal(true)} />
        {/* ...other dashboard sections here... */}
        <main>

          <HomePages />
          {/* Loan Modal */}
          {showLoanModal && (
            <Modal onClose={() => setShowLoanModal(false)}>
              <LoanForm onCreated={() => setShowLoanModal(false)} />
            </Modal>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

// Reusable Modal Component
function Modal({ children, onClose }) {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-indigo-600"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
