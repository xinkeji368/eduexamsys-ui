import axios from 'axios';
import { Message } from 'element-ui';
import storage from './storage';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'http://localhost:8080',
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    const token = storage.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200 && res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 3000
      });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  error => {
    console.error('Response error:', error);
    let message = 'Network Error';
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = 'Unauthorized, please login';
          storage.clear();
          window.location.href = '/';
          break;
        case 403:
          message = 'Access denied';
          break;
        case 404:
          message = 'Resource not found';
          break;
        case 500:
          message = 'Server error';
          break;
        default:
          message = error.response.data?.message || 'Request failed';
      }
    }
    Message({
      message,
      type: 'error',
      duration: 3000
    });
    return Promise.reject(error);
  }
);

export default service;

export function get(url, params) {
  return service.get(url, { params });
}

export function post(url, data) {
  return service.post(url, data);
}

export function put(url, data) {
  return service.put(url, data);
}

export function del(url, params) {
  return service.delete(url, { params });
}
