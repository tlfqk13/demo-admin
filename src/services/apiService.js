import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:8888/api', // API 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiService;
