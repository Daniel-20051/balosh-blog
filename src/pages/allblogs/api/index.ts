import axios from "axios";
import { BASE_URL } from '../../../contexts/AuthContext';

export const getBlogs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/blogs`,);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getBlogStats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/blogs/stats`,);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

