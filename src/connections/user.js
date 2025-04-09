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

export const getUser = async (userId) => {
    const headers = getHeaders();

    const response = await axios.get(`${baseUrl}/user`, {
        params: { id: userId },
        headers
    });

    return response.data;
};

export const getUsers = async (role) => {
    const headers = getHeaders();

    const response = await axios.get(`${baseUrl}/users`, {
        params: role ? { role } : {},
        headers
    });

    return response.data;
};

export const login = async ({ email, password }) => {
    const response = await axios.post(`${baseUrl}/login`, {
        email,
        password
    })
    return response;
};

export const register = async ({ newUserData }) => {
    const response = await axios.post(`${baseUrl}/register`, {
        newUserData
    })
    return response;
};

export const loginApiPPI = async () => {
    const response = await axios.get(`${baseUrl}/Account/loginApi`)
    return response;
};

export const deleteUser = async (userId) => {
    console.log("userID", userId);
    const headers = getHeaders();

    const response = await axios.delete(`${baseUrl}/userDelete`, {
        data: { id: userId },
        headers,
    });

    return response;
};

export const updateUser = async ( newUserData ) => {
    console.log("dataSend", newUserData);
    const headers = getHeaders();
    const response = await axios.put(`${baseUrl}/user`, newUserData, {
        headers
    });
    return response;
};
