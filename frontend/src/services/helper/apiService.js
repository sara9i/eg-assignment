import axios from 'axios';
import keys from '../../config/keys';

const { baseURL } = keys;

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    alert("An error occurred. Please try again.");
    return Promise.reject(error);
  }
);

export default apiClient;
