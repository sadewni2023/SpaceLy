// Simple security utilities for the application

/**
 * Basic HTML escaping function
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export const escapeHTML = (text) => {
  if (typeof text !== 'string') return text;
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Sanitize HTML content (basic implementation)
 * @param {string} html - HTML to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') return html;
  
  // Remove dangerous tags and attributes
  const safeHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/on\w+=\w+/g, '');
    
  return safeHtml;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
};

/**
 * Generate CSP (Content Security Policy) string
 * @returns {string} CSP header string
 */
export const generateCSP = () => {
  return "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';";
};

/**
 * Validate search input
 * @param {object} input - Input object
 * @returns {object} Sanitized input
 */
export const validateSearchInput = (input) => {
  const sanitized = {};
  
  Object.keys(input).forEach(key => {
    if (typeof input[key] === 'string') {
      sanitized[key] = escapeHTML(input[key].trim());
    } else {
      sanitized[key] = input[key];
    }
  });
  
  return sanitized;
};