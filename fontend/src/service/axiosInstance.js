import axios from 'axios';


const BASE_URL = 'http://localhost:5000';


export const axiosPublic = axios.create({
    baseURL: BASE_URL,
    timeout: 6000,
});


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    timeout: 6000,
    headers: {
        'Authorization': localStorage.getItem('token')
    }
    
});

// axiosPrivate.defaults.headers.common['Authorization'] = localStorage.getItem('token');
