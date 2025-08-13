import axios from "axios";
import { BASE_URL } from "../../../contexts/AuthContext";


export const getBlogStats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/blogs/stats`,);
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getRecentBlogs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/blogs?limit=5`,);
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}





