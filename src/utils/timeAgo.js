/**
 * Converts a date string or timestamp to a relative time string.
 * @param {string|number|Date} dateVal The date to convert
 * @returns {string} Relative time string
 */
export function timeAgo(dateVal) {
  if (!dateVal) return '';
  
  const date = new Date(dateVal);
  const now = new Date();
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 0) {
    return 'just now'; // handles minor time offset differences
  }
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [key, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${key}${count > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
}
