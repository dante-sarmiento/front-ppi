import { getTokenUser } from '@/helpers/getTokenUser';
import _Fetch from '../services/api'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
import axios from "axios";


const getHeaders = () => {
    const token = getTokenUser(); // Siempre obtiene el token más reciente
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const login = async ({ email, password }) => {
    const response = await axios.post(`${baseUrl}/login`, {
        email,
        password
    })
    return response;
};

export const register = async ({ email, password, accountNumber, role }) => {
    const response = await axios.post(`${baseUrl}/register`, {
        email,
        password,
        accountNumber,
        role
    })
    return response;
};

export const loginApiPPI = async () => {
    const response = await axios.post(`${baseUrl}/Account/loginApi`)
    return response;
};

export const getUser = async ({ userId }) => {
    const headers = getHeaders();
    const response = await axios.get(`${baseUrl}/user`, {
        id: userId
    },
        headers)
    return response
}