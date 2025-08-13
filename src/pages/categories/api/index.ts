import axios from "axios";
import { BASE_URL } from '../../../contexts/AuthContext';
import { getCookie } from "../../../utils/cookies";

const token = getCookie("authToken");

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addCategory = async (
    name: string,
    description: string,
    isActive: boolean,
    iconID: number
) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/categories`,
            {
                name: name,
                description: description,
                isActive: isActive,
                icon: iconID
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCategory = async (id: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const editCategory = async (
    id: string,
    name: string,
    description: string,
    isActive: boolean,
) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/categories/${id}`,
            {
                name: name,
                description: description,
                isActive: isActive,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
