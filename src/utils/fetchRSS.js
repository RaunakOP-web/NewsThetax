import axios from 'axios';

/**
 * Normalizes description content by stripping HTML tags and cleaning up spaces.
 */
function cleanDescription(html) {
  if (!html) return '';
  // Strip HTML tags
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || "";
  return text.trim();
}

/**
 * Attempts to extract an image URL from an HTML description or item fields.
 */
function extractImage(item) {
  if (item.thumbnail && typeof item.thumbnail === 'string' && item.thumbnail.trim().length > 0) {
    return item.thumbnail;
  }
  
  if (item.enclosure && item.enclosure.link && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    return item.enclosure.link;
  }

  // Parse HTML description for img src
  const html = item.description || item.content;
  if (html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const img = doc.querySelector('img');
    if (img && img.src) {
      return img.src;
    }
  }

  return null;
}

/**
 * Fetches an RSS feed from rss2json and normalizes its items.
 * @param {string} rssUrl The raw RSS feed URL
 * @param {string} sourceName The friendly name of the feed source
 * @returns {Promise<Array>} Normalized articles
 */
export async function fetchFeed(rssUrl, sourceName) {
  try {
    const encodedUrl = encodeURIComponent(rssUrl);
    const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodedUrl}`);
    
    if (response.data && response.data.status === 'ok') {
      return response.data.items.map(item => {
        // Clean description
        const rawDesc = item.description || '';
        const cleanedDesc = cleanDescription(rawDesc);
        
        // Extract image
        const thumbnail = extractImage(item);
        
        return {
          title: item.title ? item.title.trim() : '',
          description: cleanedDesc,
          link: item.link,
          thumbnail: thumbnail,
          pubDate: item.pubDate || new Date().toISOString(),
          source: sourceName
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching feed from ${sourceName}:`, error);
    throw error;
  }
}
