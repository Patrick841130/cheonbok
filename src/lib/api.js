const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Generic API request function
async function apiRequest(endpoint, options = {}) {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || 'Request failed');
    }

    return response.json();
}

// Auth API
export const authApi = {
    login: async (username, password) => {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('isLoggedIn', 'true');
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
    },

    verify: () => apiRequest('/auth/verify'),

    isAuthenticated: () => !!getToken(),
};

// News API
export const newsApi = {
    getAll: () => apiRequest('/news'),
    create: (data) => apiRequest('/news', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiRequest(`/news/${id}`, { method: 'DELETE' }),
};

// Schedule API
export const scheduleApi = {
    getAll: () => apiRequest('/schedule'),
    create: (data) => apiRequest('/schedule', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/schedule/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiRequest(`/schedule/${id}`, { method: 'DELETE' }),
};

// Instructors API
export const instructorsApi = {
    getAll: () => apiRequest('/instructors'),
    create: (data) => apiRequest('/instructors', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/instructors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiRequest(`/instructors/${id}`, { method: 'DELETE' }),
};

export default {
    auth: authApi,
    news: newsApi,
    schedule: scheduleApi,
    instructors: instructorsApi,
};
