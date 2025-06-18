import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept : "application/json",
    },
})

//Request Interceptors
axiosInstance.interceptors.request.use(       // This interceptor is used to modify the request before it is sent 
    (config) => {
        const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
        if (token) {                                // If a token exists, it is added to the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//Response Interceptors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
           window.location.href = '/login';  // Redirect to login page if unauthorized
        }
        else if (error.response && error.response.status === 403) {
            // Handle forbidden access, e.g., show an error message
            console.error('Access forbidden: ', error.response.data.message);
        } else {
            // Handle other errors
            console.error('An error occurred: ', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;  