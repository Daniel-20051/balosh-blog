import axios from "axios";
import { BASE_URL } from "../../../contexts/AuthContext";

export const signUp = async (email: string, password: string, firstName: string, lastName: string, username: string, bio: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "bio": bio,
        });
        return response.data;
    } catch (error) {
        
        throw error;
    }
}