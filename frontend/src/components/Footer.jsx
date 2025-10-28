import React from "react";
export default function Footer() {
    return (
        <footer className="bg-gradient-to-tr from-indigo-500 via-indigo-900 to-gray-900 text-white pt-10 pb-5 px-4 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-10">
                <div>
                    <div className="flex items-center space-x-3 mb-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 shadow-lg">
                            <svg className="w-7 h-7 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                <path d="M8 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        <span className="text-2xl font-bold tracking-wide">Microfinance Impact</span>
                    </div>
                    <p className="text-gray-300 text-sm max-w-xs">
                        Harnessing machine learning and causal analytics for actionable impact forecasting in microfinance. Enabling inclusion, transparency, and better outcomes.
                    </p>
                </div>

                <div className="flex flex-col space-y-2 md:space-y-1">
                    <h4 className="font-semibold uppercase text-gray-200 tracking-wider mb-2">Features</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                        <li>
                            <span className="hover:text-indigo-300 transition-colors cursor-pointer">Real-time Loan Predictions</span>
                        </li>
                        <li>
                            <span className="hover:text-indigo-300 transition-colors cursor-pointer">Early Risk Alerts</span>
                        </li>
                        <li>
                            <span className="hover:text-indigo-300 transition-colors cursor-pointer">Interactive Policy Simulations</span>
                        </li>
                        <li>
                            <span className="hover:text-indigo-300 transition-colors cursor-pointer">Causal Impact Analysis</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-2 md:items-end">
                    <h4 className="font-semibold uppercase text-gray-200 tracking-wider mb-2">Contact</h4>
                    <span className="text-sm text-gray-300">info@microfinanceimpact.org</span>
                    <span className="text-sm text-gray-300">Empowering small entrepreneurs & households.</span>
                    <div className="mt-4 text-xs text-gray-400">
                        © {new Date().getFullYear()} Microfinance Impact Project
                    </div>
                </div>
            </div>
            <div className="border-t border-indigo-800 my-5" />
            <div className="max-w-7xl mx-auto text-center text-xs text-gray-500 pt-2">
                Built for a more inclusive, data-driven future in microfinance.
            </div>
        </footer>
    );
}
