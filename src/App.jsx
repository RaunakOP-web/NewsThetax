import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TickerBar from './components/TickerBar';
import MarketSummary from './components/MarketSummary';
import CategoryTabs from './components/CategoryTabs';
import NewsFeed from './components/NewsFeed';
import Footer from './components/Footer';
import MarketWidgets from './components/MarketWidgets';
import { useNews } from './hooks/useNews';

export default function App() {
  // 1. Dark Mode / Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply class to HTML & Body
  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    if (isDark) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  // 2. Active Tab State
  const [activeTab, setActiveTab] = useState('All');

  // 3. Bookmarks State (cached in localStorage)
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (art) => {
    setBookmarks(prev => {
      const exists = prev.some(item => item.link === art.link);
      if (exists) {
        return prev.filter(item => item.link !== art.link);
      } else {
        return [...prev, art];
      }
    });
  };

  // 4. News Hook Integration
  const { 
    articles, 
    loading, 
    error, 
    newsApiKeyMissing, 
    hasMore, 
    loadMore, 
    refetch 
  } = useNews(activeTab === 'Bookmarks' ? 'All' : activeTab);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const isBookmarksTab = activeTab === 'Bookmarks';
  const displayArticles = isBookmarksTab ? bookmarks : articles;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200 flex flex-col">
      {/* 1. Header & Navigation */}
      <Navbar 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* 2. Ticker Banner */}
      <TickerBar />

      {/* 3. Market Snapshot Strip */}
      <MarketSummary />

      {/* 4. Sentiment Dial and Ticker widgets */}
      <MarketWidgets articles={articles} />

      {/* 5. Main Dashboard Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4">
        {/* Category filtering section */}
        <div className="mt-2">
          <CategoryTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
        </div>

        {/* News Grid */}
        <NewsFeed 
          articles={displayArticles} 
          loading={isBookmarksTab ? false : loading} 
          error={isBookmarksTab ? null : error} 
          newsApiKeyMissing={newsApiKeyMissing} 
          hasMore={isBookmarksTab ? false : hasMore} 
          loadMore={loadMore} 
          refetch={refetch} 
          activeTab={activeTab}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
        />
      </main>

      {/* 5. Footer section */}
      <Footer />
    </div>
  );
}
