import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Backend root URL for serving static files (uploads)
const BACKEND_URL = BASE_URL.replace(/\/api$/, '');

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl; // already absolute
  return `${BACKEND_URL}${imageUrl}`;
};

export const API = {
  authenticateLogin: (loginData) =>
    axios.post(`${BASE_URL}/auth/login`, loginData).then((res) => res.data),

  userSignup: (signupData) =>
    axios.post(`${BASE_URL}/auth/signup`, signupData).then((res) => res.data),

  getUserProfile: (token) =>
    axios
      .get(`${BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  getPosts: (categoryQuery = "") =>
    axios.get(`${BASE_URL}/posts${categoryQuery}`).then((res) => res.data),

  uploadImage: (formData, token) =>
    axios
      .post(`${BASE_URL}/posts/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),

  createPost: (postData, token) =>
    axios
      .post(`${BASE_URL}/posts`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  getPostById: (postId) =>
    axios.get(`${BASE_URL}/posts/${postId}`).then((res) => res.data),

  deletePost: async (postId, token) => {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  updatePost: (postId, postData, token) =>
    axios
      .put(`${BASE_URL}/posts/${postId}`, postData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),
};
