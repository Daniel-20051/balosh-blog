import axios from "axios";
import { BASE_URL } from "../../../contexts/AuthContext";
import { getCookie } from "../../../utils/cookies";

const token = getCookie("authToken");

export const updateUser = async (userData: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    username?: string;
    bio?: string;
    email?: string;
    profilePhoto?: File | null;
}) => {
    try {
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`
        };

        let payload: FormData | Record<string, unknown>;

        if (userData.profilePhoto instanceof File) {
            const formData = new FormData();
            if (userData.firstName !== undefined) formData.append('firstName', userData.firstName);
            if (userData.lastName !== undefined) formData.append('lastName', userData.lastName);
            if (userData.displayName !== undefined) formData.append('displayName', userData.displayName);
            if (userData.username !== undefined) formData.append('username', userData.username);
            if (userData.bio !== undefined) formData.append('bio', userData.bio);
            if (userData.email !== undefined) formData.append('email', userData.email);
            formData.append('profilePhoto', userData.profilePhoto);
            payload = formData;
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            const { profilePhoto: _omit, ...jsonPayload } = userData;
            payload = jsonPayload;
        }

        const response = await axios.put(`${BASE_URL}/auth/profile`, payload, {
            headers
        });
        
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}