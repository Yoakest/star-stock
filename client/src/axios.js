import axios from 'axios';

// Tarayıcının bulunduğu host'u al
const host = window.location.hostname;

// Backend portunu burada belirle
const backendPort = 3001;


// Dinamik olarak baseURL oluştur
const baseURL = `http://${host}:${backendPort}/api`;

console.log("Backend Port:", baseURL);

const api = axios.create({
    baseURL: baseURL
});

export default api;
