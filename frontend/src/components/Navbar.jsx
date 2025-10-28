// import React, { useState } from "react";

// export default function Navbar() {
//     const [showMenu, setShowMenu] = useState(false);

//     return (
//         <nav className="bg-white sticky top-0 z-50 shadow-lg">
//             <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
//                 <div className="flex items-center space-x-3">
//                     <span className="inline-block w-9 h-9 flex items-center justify-center bg-indigo-100 rounded-full">
//                         <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                             <circle cx="12" cy="12" r="10" />
//                             <path d="M8 12l2 2 4-4" strokeLinecap="round" />
//                         </svg>
//                     </span>
//                     <span className="text-2xl font-bold text-indigo-700">Microfinance</span>
//                     <span className="text-2xl font-bold text-gray-800">Impact</span>
//                 </div>

//                 <div className="hidden md:flex space-x-9 items-center">
//                     <a href="#dashboard" className="font-medium text-gray-700 hover:text-indigo-600 transition">Dashboard</a>
//                     <a href="#borrowers" className="font-medium text-gray-700 hover:text-indigo-600 transition">Borrowers</a>
//                     <a href="#predictions" className="font-medium text-gray-700 hover:text-indigo-600 transition">Predictions</a>
//                     <button className="ml-4 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 font-semibold transition">
//                         + New Loan
//                     </button>
//                 </div>

//                 <button
//                     className="md:hidden p-2 rounded-full text-indigo-600 hover:bg-indigo-100"
//                     onClick={() => setShowMenu(!showMenu)}
//                     aria-label="Toggle menu"
//                 >
//                     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                         <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />
//                     </svg>
//                 </button>
//             </div>

//             {showMenu && (
//                 <div className="md:hidden bg-white border-t px-6 pt-2 pb-4 flex flex-col space-y-4 shadow">
//                     <a href="#dashboard" className="font-medium text-gray-700 hover:text-indigo-600 transition">Dashboard</a>
//                     <a href="#borrowers" className="font-medium text-gray-700 hover:text-indigo-600 transition">Borrowers</a>
//                     <a href="#predictions" className="font-medium text-gray-700 hover:text-indigo-600 transition">Predictions</a>
//                     <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 font-semibold transition mt-2">
//                         + New Loan
//                     </button>
//                 </div>
//             )}
//         </nav>
//     );
// }


import React, { useState } from "react";

export default function Navbar({ onNewLoan }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-9 h-9 flex items-center justify-center bg-indigo-100 rounded-full">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2 2 4-4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-2xl font-bold text-indigo-700">Microfinance</span>
          <span className="text-2xl font-bold text-gray-800">Impact</span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-9 items-center">
          <a href="#dashboard" className="font-medium text-gray-700 hover:text-indigo-600 transition">Dashboard</a>
          <a href="#borrowers" className="font-medium text-gray-700 hover:text-indigo-600 transition">Borrowers</a>
          <a href="#predictions" className="font-medium text-gray-700 hover:text-indigo-600 transition">Predictions</a>
          <button
            className="ml-4 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 font-semibold transition"
            onClick={onNewLoan}
          >
            + New Loan
          </button>
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-full text-indigo-600 hover:bg-indigo-100"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white border-t px-6 pt-2 pb-4 flex flex-col space-y-4 shadow">
          <a href="#dashboard" className="font-medium text-gray-700 hover:text-indigo-600 transition">Dashboard</a>
          <a href="#borrowers" className="font-medium text-gray-700 hover:text-indigo-600 transition">Borrowers</a>
          <a href="#predictions" className="font-medium text-gray-700 hover:text-indigo-600 transition">Predictions</a>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 font-semibold transition mt-2"
            onClick={() => {
              setShowMenu(false);
              onNewLoan();
            }}
          >
            + New Loan
          </button>
        </div>
      )}
    </nav>
  );
}
