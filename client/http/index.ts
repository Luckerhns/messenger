import axios from 'axios';

export const $user = axios.create({
  baseURL: '/api',
});

export const $admin = axios.create({
  baseURL: '/api',
});

// User interceptor - add token
$user.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// Admin interceptor - admin token
$admin.interceptors.request.use((config) => {
  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// Global response interceptor
const responseInterceptors = [ $user, $admin ];
responseInterceptors.forEach(instance => {
  instance.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
});

export default {
  $user,
  $admin,
};
