import React from 'react';

const TABS = [
  { id: 'All', name: 'All News' },
  { id: 'NSE', name: 'NSE' },
  { id: 'BSE', name: 'BSE' },
  { id: 'IPO', name: 'IPO' },
  { id: 'Economy', name: 'Economy' },
  { id: 'Mutual Funds', name: 'Mutual Funds' },
  { id: 'Global', name: 'Global Market' },
  { id: 'Bookmarks', name: 'Saved 🔖' }
];

export default function CategoryTabs({ activeTab, onTabChange }) {
  return (
    <div className="w-full border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar -mb-px">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`py-4 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
