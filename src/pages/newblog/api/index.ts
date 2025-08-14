import axios from "axios";
import { BASE_URL } from "../../../contexts/AuthContext";
import { getAuthToken } from "../../../utils/cookies";

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`,)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const newBlog = async (
    featuredImage: File, title: string, content: string, excerpt: string, categoryId: string, status: string, tags: string, metaTitle: string, metaDescription: string) => {
      console.log(featuredImage);
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('excerpt', excerpt);
      formData.append('category', categoryId);
      formData.append('tags', tags);
      formData.append('status', status);
      formData.append('metaTitle', metaTitle);
      formData.append('metaDescription', metaDescription);
      formData.append('featuredImage', featuredImage);

      const response = await axios.post(`${BASE_URL}/blogs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        }
      )
      ;
      return response
    }
    catch(err){
     console.log(err);
      return err
    }
  }