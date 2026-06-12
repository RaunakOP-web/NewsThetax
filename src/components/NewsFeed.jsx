import React from 'react';
import NewsCard from './NewsCard';

export default function NewsFeed({ 
  articles, 
  loading, 
  error, 
  newsApiKeyMissing, 
  hasMore, 
  loadMore, 
  refetch, 
  activeTab,
  bookmarks = [],
  onToggleBookmark
}) {
  // Render loading skeletons
  if (loading && articles.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeleton Hero representation */}
          {activeTab === 'All' && (
            <div className="col-span-full grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 animate-pulse h-[350px]">
              <div className="lg:col-span-7 bg-gray-200 dark:bg-slate-700 h-full" />
              <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4 mb-4" />
                  <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/5" />
                </div>
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-full w-1/3" />
              </div>
            </div>
          )}
          
          {/* Standard Skeletons */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div 
              key={idx} 
              className="border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 p-5 animate-pulse flex flex-col h-[380px]"
            >
              <div className="h-40 bg-gray-200 dark:bg-slate-700 rounded-xl mb-4 w-full" />
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-3" />
              <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-5/6 mb-2" />
              <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-2/3 mb-4" />
              <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded w-full mt-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (error && articles.length === 0) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
          Unable to Load News
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-450 mb-6">
          {error}
        </p>
        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
          </svg>
          Try Again
        </button>
      </div>
    );
  }

  // Render empty state
  if (articles.length === 0) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">
          {activeTab === 'Bookmarks' ? 'No Bookmarked Stories' : 'No Articles Found'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-450">
          {activeTab === 'Bookmarks' 
            ? 'Bookmark articles by clicking the bookmark icon on any news card to save them here.' 
            : "We couldn't find any stock market news matching your request. Check back later."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* NewsAPI key instruction banner */}
      {newsApiKeyMissing && activeTab === 'Global' && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-300 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
          <div>
            <span className="font-bold block sm:inline">⚠️ Local Fallback Search Active: </span>
            A free NewsAPI key was not found. NewsAPI search has fallen back to scanning cached RSS feed stories.
          </div>
          <a
            href="https://newsapi.org/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex self-start sm:self-auto items-center font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-350 underline"
          >
            Get Free Key
            <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => {
          // Render the first article as a Hero card ONLY in "All" tab
          const isHero = index === 0 && activeTab === 'All';
          const isBookmarked = bookmarks.some(b => b.link === article.link);
          return (
            <NewsCard 
              key={article.link || index} 
              article={article} 
              isHero={isHero} 
              isBookmarked={isBookmarked}
              onToggleBookmark={onToggleBookmark}
            />
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-750 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            Load More Stories
          </button>
        </div>
      )}
    </div>
  );
}
