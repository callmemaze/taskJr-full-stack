import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);

export const fetchBlog = () => API.get("/blog");
export const fetchBlogDetails = (id) => API.get(`/blog/${id}`);
export const createBlog = (newBlog) => API.post("/blog", newBlog);
export const commentBlog = (value, id) =>
  API.post(`/blog/${id}/commentPost`, { value });
export const updateBlog = (id, updatedPost) =>
  API.patch(`/blogs/${id}`, updatedPost);
export const deleteBlog = (id) => API.delete(`/blog/${id}`);
export const fetchBlogByCategory = (category) =>
  API.get(`/blog/search/category?name=${category}`);
