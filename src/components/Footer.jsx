import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-6 mt-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-slate-400">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-700 dark:text-slate-350">
            StockPulse India — News aggregated from public RSS feeds.
          </p>
          <p className="mt-1 text-[11px] text-gray-400 dark:text-slate-500">
            Disclaimer: Not financial advice. For informational purposes only.
          </p>
        </div>

        {/* Right Section (Sources) */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span className="font-bold text-gray-400 dark:text-slate-500 mr-1">Sources:</span>
          <a 
            href="https://economictimes.indiatimes.com/markets" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
          >
            ET Markets
          </a>
          <a 
            href="https://www.moneycontrol.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
          >
            Moneycontrol
          </a>
          <a 
            href="https://www.business-standard.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
          >
            Business Std
          </a>
          <a 
            href="https://www.livemint.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline"
          >
            Livemint
          </a>
        </div>
      </div>
    </footer>
  );
}
