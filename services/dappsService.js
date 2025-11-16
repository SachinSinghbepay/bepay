// services/dappsService.js
// Service for interacting with dApps API endpoints

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dev.bepay.money';

/**
 * Fetch dApps from the API
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of dApps to fetch (default: 100)
 * @param {number} options.page - Page number for pagination (default: 1)
 * @param {string} options.category - Filter by category (optional)
 * @param {string} options.network - Filter by network (optional)
 * @returns {Promise<Object>} Response with dapps array and pagination info
 */
export async function fetchDApps({ limit = 100, page = 1, category, network } = {}) {
  try {
    const params = new URLSearchParams({ limit: limit.toString(), page: page.toString() });
    if (category) params.append('category', category);
    if (network) params.append('network', network);

    const url = `${API_BASE_URL}/api/dapps?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authenticated requests
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[dappsService] Error response:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch dApps');
    }

    return result.data;
  } catch (error) {
    console.error('[dappsService] fetchDApps error:', error);
    throw error;
  }
}

/**
 * Fetch top/featured dApps from the category endpoint
 * @returns {Promise<Array>} Array of top dApps
 */
export async function fetchTopDApps() {
  try {
    const url = `${API_BASE_URL}/api/dapps/category/top`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authenticated requests
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[dappsService] Error response:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch top dApps');
    }

    return result.data;
  } catch (error) {
    console.error('[dappsService] fetchTopDApps error:', error);
    throw error;
  }
}

/**
 * Fetch a single dApp by ID or slug
 * @param {string} identifier - dApp ID or slug
 * @returns {Promise<Object>} dApp details
 */
export async function fetchDAppById(identifier) {
  try {
    const url = `${API_BASE_URL}/api/dapps/${identifier}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch dApp');
    }

    return result.data;
  } catch (error) {
    console.error('[dappsService] fetchDAppById error:', error);
    throw error;
  }
}

/**
 * Track a dApp visit
 * @param {string} dappId - dApp ID
 * @returns {Promise<Object>} Response
 */
export async function trackDAppVisit(dappId) {
  try {
    const url = `${API_BASE_URL}/api/dapps/user/${dappId}/visit`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with the request
    });

    if (!response.ok) {
      console.warn('[dappsService] Failed to track visit:', response.status);
      return { success: false };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('[dappsService] trackDAppVisit error:', error);
    return { success: false };
  }
}
