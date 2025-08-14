import axios from "axios";
import { BASE_URL } from '../../../contexts/AuthContext';
import { getAuthToken } from "../../../utils/cookies";
export const getBlogs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/blogs?limit=100`,);
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

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`,);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const editBlog = async (
    id: string, featuredImage: File | null, title: string, content: string, excerpt: string, categoryId: string, status: string, tags: string, metaTitle: string, metaDescription: string) => {
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
     
      if (featuredImage) {
        formData.append('featuredImage', featuredImage);
      }

      const response = await axios.put(`${BASE_URL}/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        }
      )
      return response
    }
    catch(err){
     
      return err
    }
  }

  export const deleteBlog = async (id: string) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await axios.delete(`${BASE_URL}/blogs/${id}`, {
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

