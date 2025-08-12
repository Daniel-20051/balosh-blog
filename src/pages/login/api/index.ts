import axios from 'axios';
import { BASE_URL } from '../../../contexts/AuthContext';
import { setAuthToken } from '../../../utils/cookies';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            "email": email,
            "password": password
        });

        // Store the token in a cookie that lasts for 15 hours
        if (response.data.success && response.data.data.token) {
            setAuthToken(response.data.data.token);
        }

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}