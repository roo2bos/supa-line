import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 기본 API 경로
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
