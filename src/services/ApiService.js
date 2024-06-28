import axios from 'axios';

const API_BASE_URL = 'https://localhost:44342/api';

export const ApiService = {
    getBonos: async () => {
        return await axios.get(`${API_BASE_URL}/bonos`);
    },
    getReservas: async () => {
        return await axios.get(`${API_BASE_URL}/reservas`);
    },
    addReserva: async (reservation) => {
        return await axios.post(`${API_BASE_URL}/reservas`, reservation);
    },
    deleteReserva: async (id) => {
        return await axios.delete(`${API_BASE_URL}/reservas/${id}`);
    },
};