import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const $user = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const $admin = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// User interceptor - add token
$user.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? useAuthStore.getState().token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});

// Admin interceptor - admin token
$admin.interceptors.request.use((config) => {
  const adminToken = typeof window !== 'undefined' ? useAuthStore.getState().token : null;
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
        useAuthStore.getState().logout();
        // if (typeof window !== 'undefined') {
        //   window.location.href = '/login';
        // }
      }
      return Promise.reject(error);
    }
  );
});

export default {
  $user,
  $admin,
};
