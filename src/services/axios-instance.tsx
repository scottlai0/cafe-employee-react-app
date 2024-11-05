import axios from 'axios';

//const HOST_URL = 'http://localhost:8000/'
const HOST_URL = 'https://sample-fastapi-1.onrender.com/'

export const axiosInstance = axios.create({
  baseURL: HOST_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
