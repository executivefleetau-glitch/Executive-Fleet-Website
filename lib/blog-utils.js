/**
 * Calculate estimated reading time based on word count
 * @param {string} content - HTML content from blog
 * @returns {number} - Estimated reading time in minutes
 */
export function calculateReadTime(content) {
  if (!content) return 1;
  
  const wordsPerMinute = 200;
  
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  // Count words
  const wordCount = text.trim().split(/\s+/).length;
  
  // Calculate minutes (minimum 1 minute)
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return minutes > 0 ? minutes : 1;
}

/**
 * Generate URL-friendly slug from title
 * @param {string} title - Blog title
 * @returns {string} - URL-friendly slug
 */
export function generateSlug(title) {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    // Replace non-alphanumeric characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/(^-|-$)/g, '');
}

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 150) {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatBlogDate(date) {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Extract plain text from HTML
 * @param {string} html - HTML content
 * @returns {string} - Plain text
 */
export function stripHtml(html) {
  if (!html) return '';
  
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

/**
 * Validate slug format
 * @param {string} slug - Slug to validate
 * @returns {boolean} - True if valid
 */
export function isValidSlug(slug) {
  if (!slug) return false;
  
  // Slug should only contain lowercase letters, numbers, and hyphens
  // Should not start or end with hyphen
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  
  return slugPattern.test(slug);
}

/**
 * Extract image URLs from HTML content
 * @param {string} html - HTML content
 * @returns {string[]} - Array of image URLs
 */
export function extractImageUrls(html) {
  if (!html) return [];
  
  const imgPattern = /<img[^>]+src="([^">]+)"/g;
  const urls = [];
  let match;
  
  while ((match = imgPattern.exec(html)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

/**
 * Sanitize HTML content (basic XSS prevention)
 * @param {string} html - HTML content
 * @returns {string} - Sanitized HTML
 */
export function sanitizeHtml(html) {
  if (!html) return '';
  
  // Remove potentially dangerous tags and attributes
  // Note: For production, consider using a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
}

