import { useState, useEffect, useCallback, useRef } from 'react';
import { FEEDS } from '../constants/feeds';
import { fetchFeed } from '../utils/fetchRSS';
import axios from 'axios';

// Cache to store news data by tabId
// Format: { [cacheKey]: { articles: [...], fetchedAt: timestamp } }
const sessionCache = {};
const CACHE_DURATION_MS = 2 * 60 * 1000; // 2 minutes

export function useNews(activeTab) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(9); // For Load More pagination
  const [newsApiKeyMissing, setNewsApiKeyMissing] = useState(false);

  // Keep a ref of all RSS articles we've ever fetched in this session
  // to power local search fallbacks when NewsAPI is unavailable/no key.
  const allRssCacheRef = useRef([]);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    setNewsApiKeyMissing(false);
    setDisplayCount(9); // Reset pagination size

    const cacheKey = activeTab;
    const now = Date.now();

    // 1. Check Session Cache (if not force refreshing)
    if (!forceRefresh && sessionCache[cacheKey] && (now - sessionCache[cacheKey].fetchedAt < CACHE_DURATION_MS)) {
      setArticles(sessionCache[cacheKey].articles);
      setLoading(false);
      return;
    }

    try {
      let result = [];

      // 2. Fetch based on active tab
      switch (activeTab) {
        case 'All': {
          // Fetch from all RSS feeds in parallel
          const promises = FEEDS.map(feed => 
            fetchFeed(feed.url, feed.name).catch(err => {
              console.error(`Failed to fetch ${feed.name}:`, err);
              return [];
            })
          );
          const feedResults = await Promise.all(promises);
          result = feedResults.flat();
          break;
        }
        case 'NSE': {
          const feed = FEEDS.find(f => f.id === 'et-markets');
          result = await fetchFeed(feed.url, feed.name);
          break;
        }
        case 'BSE': {
          const feed = FEEDS.find(f => f.id === 'business-standard');
          result = await fetchFeed(feed.url, feed.name);
          break;
        }
        case 'IPO': {
          const feed = FEEDS.find(f => f.id === 'moneycontrol');
          const items = await fetchFeed(feed.url, feed.name);
          result = items.filter(item => 
            (item.title && item.title.toLowerCase().includes('ipo')) || 
            (item.description && item.description.toLowerCase().includes('ipo'))
          );
          break;
        }
        case 'Economy': {
          const livemint = FEEDS.find(f => f.id === 'livemint');
          const ndtv = FEEDS.find(f => f.id === 'ndtv-profit');
          
          const [lmItems, ndtvItems] = await Promise.all([
            fetchFeed(livemint.url, livemint.name).catch(() => []),
            fetchFeed(ndtv.url, ndtv.name).catch(() => [])
          ]);
          result = [...lmItems, ...ndtvItems];
          break;
        }
        case 'Mutual Funds': {
          const feed = FEEDS.find(f => f.id === 'moneycontrol');
          const items = await fetchFeed(feed.url, feed.name);
          result = items.filter(item => 
            (item.title && (item.title.toLowerCase().includes('mutual fund') || item.title.toLowerCase().includes(' mf '))) || 
            (item.description && (item.description.toLowerCase().includes('mutual fund') || item.description.toLowerCase().includes(' mf ')))
          );
          break;
        }
        case 'Global': {
          if (!apiKey || apiKey === 'your_key_here' || apiKey.trim() === '') {
            setNewsApiKeyMissing(true);
            result = filterLocalRSS('global'); // Fallback keywords
          } else {
            try {
              const query = encodeURIComponent('Indian stock market');
              const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
              const res = await axios.get(url);
              if (res.data && res.data.articles) {
                result = res.data.articles.map(art => ({
                  title: art.title,
                  description: art.description || '',
                  link: art.url,
                  thumbnail: art.urlToImage,
                  pubDate: art.publishedAt,
                  source: art.source?.name || 'Global News'
                }));
              }
            } catch (err) {
              console.error("NewsAPI Global failed, using local fallback:", err);
              setNewsApiKeyMissing(true);
              result = filterLocalRSS('global');
            }
          }
          break;
        }
        default:
          result = [];
      }

      // 3. Post-processing: Deduplicate and sort by date
      let finalArticles = deduplicateArticles(result);
      
      // Sort by publication date (newest first)
      finalArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      // Cache all RSS items loaded to support local search
      if (activeTab === 'All' && finalArticles.length > 0) {
        allRssCacheRef.current = finalArticles;
      } else if (finalArticles.length > 0) {
        // Merge into current all-RSS cache
        const combined = [...allRssCacheRef.current, ...finalArticles];
        allRssCacheRef.current = deduplicateArticles(combined);
      }

      // Store in session cache
      sessionCache[cacheKey] = {
        articles: finalArticles,
        fetchedAt: Date.now()
      };

      setArticles(finalArticles);
    } catch (err) {
      console.error("Failed to load news:", err);
      setError("We encountered an error loading the latest stock news. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [activeTab, apiKey]);

  // Deduplication logic by title
  const deduplicateArticles = (items) => {
    const seen = new Set();
    return items.filter(item => {
      const titleKey = item.title ? item.title.trim().toLowerCase() : '';
      if (!titleKey || seen.has(titleKey)) {
        return false;
      }
      seen.add(titleKey);
      return true;
    });
  };

  // Local search helper
  const filterLocalRSS = (query) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    
    // Search within current RSS cache
    const sourceList = allRssCacheRef.current.length > 0 
      ? allRssCacheRef.current 
      : [];
      
    return sourceList.filter(item => 
      (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
      (item.source && item.source.toLowerCase().includes(lowerQuery))
    );
  };

  // Trigger fetch when tab or query changes
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const loadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  const paginatedArticles = articles.slice(0, displayCount);
  const hasMore = articles.length > displayCount;

  return {
    articles: paginatedArticles,
    totalCount: articles.length,
    loading,
    error,
    newsApiKeyMissing,
    hasMore,
    loadMore,
    refetch: () => fetchNews(true)
  };
}
