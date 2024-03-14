import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://aviasales-test-api.kata.academy/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const api = {
    getSearchId: () => instance.get('search'),
    getTickets: (id) => instance.get(`tickets?searchId=${id}`),
};

export default api;
