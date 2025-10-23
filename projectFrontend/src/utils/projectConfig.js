import { projectConfigAPI } from '../api/api';

/**
 * Extract project key from subdomain
 * @returns {string} Project key (e.g., 'vidya', 'munirka')
 */
export const getProjectKeyFromSubdomain = () => {
    const hostname = window.location.hostname;

    // For production: extract from subdomain (e.g., vidya.nssiitd.in → vidya)
    if (hostname.includes('nssiitd.in')) {
        const parts = hostname.split('.');
        return parts[0]; // First part is the subdomain
    }

    // For development: check if there's a query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectParam = urlParams.get('project');
    if (projectParam) {
        return projectParam;
    }

    // Default fallback
    return 'vidya';
};

/**
 * Load project configuration from backend API
 * @param {string} projectKey - Project key (optional, will use subdomain if not provided)
 * @returns {Promise<Object>} Project configuration object
 */
export const loadProjectConfig = async (projectKey = null) => {
    try {
        const key = projectKey || getProjectKeyFromSubdomain();
        const response = await projectConfigAPI.getProjectConfig(key);

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error('Invalid response format from API');
    } catch (error) {
        console.error('Error loading project configuration:', error);

        // Return default configuration as fallback
        return getDefaultConfig();
    }
};

/**
 * Get default configuration (fallback when API fails)
 * @returns {Object} Default project configuration
 */
const getDefaultConfig = () => {
    return {
        key: 'vidya',
        name: 'Vidya Digital Platform',
        subdomain: 'vidya',
        description: 'Interactive digital courses for underserved students',
        theme: {
            primary: '#7C3AED',
            secondary: '#FBBF24',
            background: '#f3f4f6'
        },
        stats: {
            students: 200,
            volunteers: 15,
            hours: 14000,
            classes: 600
        },
        testimonials: [],
        curriculum: [],
        resources: [],
        gallery: [],
        contact: {
            email: 'vidya@nssiitd.in',
            phone: '+91 87654 32109',
            address: 'IIT Delhi, Hauz Khas, New Delhi - 110016'
        },
        social: {
            facebook: 'https://facebook.com/nssvidya',
            instagram: 'https://instagram.com/nssvidya',
            twitter: 'https://twitter.com/nssvidya'
        },
        metadata: {
            seoTitle: 'Vidya Digital Platform - NSS IIT Delhi',
            seoDescription: 'Access quality education online through our interactive digital learning platform.',
            seoKeywords: ['online learning', 'digital education', 'nss', 'vidya']
        }
    };
};

/**
 * Apply theme colors to document
 * @param {Object} theme - Theme object with primary, secondary, background colors
 */
export const applyThemeColors = (theme) => {
    if (!theme) return;

    const root = document.documentElement;

    if (theme.primary) {
        root.style.setProperty('--color-primary', theme.primary);
    }

    if (theme.secondary) {
        root.style.setProperty('--color-secondary', theme.secondary);
    }

    if (theme.background) {
        root.style.setProperty('--color-background', theme.background);
    }
};

/**
 * Update document metadata (SEO)
 * @param {Object} metadata - Metadata object with seoTitle, seoDescription, seoKeywords
 */
export const updateDocumentMetadata = (metadata) => {
    if (!metadata) return;

    // Update title
    if (metadata.seoTitle) {
        document.title = metadata.seoTitle;
    }

    // Update meta description
    if (metadata.seoDescription) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = metadata.seoDescription;
    }

    // Update meta keywords
    if (metadata.seoKeywords && Array.isArray(metadata.seoKeywords)) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = metadata.seoKeywords.join(', ');
    }
};

/**
 * Cache project config in localStorage
 * @param {string} key - Project key
 * @param {Object} config - Configuration object to cache
 */
export const cacheProjectConfig = (key, config) => {
    try {
        const cacheData = {
            config,
            timestamp: Date.now(),
            version: '1.0'
        };
        localStorage.setItem(`project_config_${key}`, JSON.stringify(cacheData));
    } catch (error) {
        console.warn('Failed to cache project config:', error);
    }
};

/**
 * Get cached project config from localStorage
 * @param {string} key - Project key
 * @param {number} maxAge - Maximum cache age in milliseconds (default: 1 hour)
 * @returns {Object|null} Cached configuration or null if not found/expired
 */
export const getCachedProjectConfig = (key, maxAge = 3600000) => {
    try {
        const cached = localStorage.getItem(`project_config_${key}`);
        if (!cached) return null;

        const cacheData = JSON.parse(cached);
        const age = Date.now() - cacheData.timestamp;

        // Check if cache is still valid
        if (age < maxAge) {
            return cacheData.config;
        }

        // Cache expired, remove it
        localStorage.removeItem(`project_config_${key}`);
        return null;
    } catch (error) {
        console.warn('Failed to get cached project config:', error);
        return null;
    }
};

/**
 * Load project config with caching
 * @param {string} projectKey - Project key (optional)
 * @param {boolean} forceRefresh - Force refresh from API (ignore cache)
 * @returns {Promise<Object>} Project configuration
 */
export const loadProjectConfigWithCache = async (projectKey = null, forceRefresh = false) => {
    const key = projectKey || getProjectKeyFromSubdomain();

    // Try to get from cache first
    if (!forceRefresh) {
        const cached = getCachedProjectConfig(key);
        if (cached) {
            console.log('Using cached project config for:', key);
            return cached;
        }
    }

    // Load from API
    console.log('Loading project config from API for:', key);
    const config = await loadProjectConfig(key);

    // Cache the result
    if (config) {
        cacheProjectConfig(key, config);
    }

    return config;
};

export default {
    getProjectKeyFromSubdomain,
    loadProjectConfig,
    loadProjectConfigWithCache,
    applyThemeColors,
    updateDocumentMetadata,
    cacheProjectConfig,
    getCachedProjectConfig,
};
