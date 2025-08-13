import axios from 'axios';
import { BASE_URL } from '../contexts/AuthContext';
import { getAuthToken } from '../utils/cookies';

export const getUser = async () => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

