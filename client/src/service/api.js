import axios from "axios";

const API_URL = 'https://fsd-production-4cc7.up.railway.app';

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
