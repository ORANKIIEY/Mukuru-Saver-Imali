import dashboardMock from '../mocks/dashboard.json';
import insightsMock from '../mocks/insights.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Base API Client
 * Automatically includes Accept-Language header based on user preference (en/zu/sn).
 * Handles mock responses and clean error handling when live backend is unreachable.
 */
export async function apiClient(endpoint, options = {}) {
  const isMockMode = localStorage.getItem('mukuru_use_mocks') !== 'false';
  const lang = localStorage.getItem('mukuru_lang') || 'en';

  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang,
    ...(options.headers || {}),
  };

  // If mock mode is explicitly enabled, return mock response
  if (isMockMode) {
    return handleMockRequest(endpoint);
  }

  // Attempt live REST API call
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[Mukuru Client] Live API call to ${endpoint} failed.`, err);
    throw new Error('Unable to connect to Mukuru live backend servers. Please ensure backend is running or switch to Mock Mode.');
  }
}

/**
 * Mock Request Handler
 */
function handleMockRequest(endpoint) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint.includes('/dashboard')) {
        resolve(dashboardMock);
      } else if (endpoint.includes('/insights')) {
        resolve(insightsMock);
      } else {
        resolve({});
      }
    }, 150);
  });
}

/**
 * Default axios-style client used by goals.js, commitments.js,
 * transactions.js and safeToSave.js.
 */
const client = {
  get: (endpoint) => apiClient(endpoint, { method: 'GET' }),
  post: (endpoint, body) =>
    apiClient(endpoint, { method: 'POST', body: JSON.stringify(body) }),
};

export default client;

/**
 * Named apiFetch used by groceries.js, simulator.js and coach.js.
 */
export const apiFetch = (endpoint, options = {}) => apiClient(endpoint, options);
