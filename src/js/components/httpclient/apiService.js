import axios from 'axios';

// Create Axios instance with default config
const api = axios.create({
  // Update baseURL to your Cloudflare Workers URL or API Gateway URL
  baseURL: process.env.VITE_API_URL || 'https://api.wizardteach.com',
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers needed for Cloudflare
    'X-Client-Version': '1.0.0',
  },
});

// Request interceptor to add auth headers if needed
api.interceptors.request.use(
  config => {
    // Add any auth tokens or headers from your auth system
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // Request made but no response
      console.error('API No Response:', error.request);
    } else {
      // Error in request setup
      console.error('API Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  /**
   * Send a test request to verify API connectivity
   * @param {Object} data - Optional test data to send
   * @returns {Promise} - The API response
   */
  testRequest(data = null) {
    return api.post('/test', {
      correlationId: `test-${Date.now()}`,
      requestType: 'test',
      parameters: data || {
        message: 'Test request from debug panel'
      }
    });
  }
};

export default apiService; 