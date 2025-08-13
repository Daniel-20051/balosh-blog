import axios from "axios";
import { BASE_URL } from '../../../contexts/AuthContext';

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



