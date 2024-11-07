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
    //exlude bad errors and authentiation error
    if(error.status <= 400 && error.status >= 409){
        alert("An error occurred. Please try again.");
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
