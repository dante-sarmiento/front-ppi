import { getTokenUser } from '@/helpers/getTokenUser';
import _Fetch from '../services/api'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";
import axios from "axios";


const getHeaders = () => {
    const token = getTokenUser(); // Siempre obtiene el token más reciente
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const addAccount = async (data) => {
    const headers = getHeaders();

    const response = await axios.post(`${baseUrl}/saveAccount`, data, {
        headers
    });

    return response.data;
};

export const getAccounts = async (userId, type) => {
    const headers = getHeaders();

    const params = {};
    if (userId) params.userId = userId;
    if (type) params.type = type;

    const response = await axios.get(`${baseUrl}/getAccounts`, {
        params,
        headers
    });

    return response.data;
};

export const deleteAccount = async (accountId ) => {
    console.log("deletAccount", accountId);
    const headers = getHeaders();

    const response = await axios.delete(`${baseUrl}/deleteAccount`, {
        data: { id: accountId },
        headers,
    });

    return response;
};
