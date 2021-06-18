import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jussimarleal.com.br/'
});

export default api;