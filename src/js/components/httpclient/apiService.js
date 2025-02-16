import axios from 'axios';

// Create Axios instance with default config
const api = axios.create({
  // We'll update this with the Azure APIM endpoint later
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Log error for debugging
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const apiService = {
  /**
   * Generate curriculum based on form data
   * @param {Object} data - The curriculum generation request data
   * @returns {Promise} - The API response
   */
  generate(data) {
    return api.post('/generate', {
      correlationId: `gen-${Date.now()}`,
      requestType: 'generate',
      parameters: data
    });
  }
};

export default apiService; 