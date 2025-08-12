import axios from 'axios';
import { BASE_URL } from '../../../contexts/AuthContext';



export const login = async (email: string, password: string ) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
             "email": email,
             "password": password
          });
          
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}