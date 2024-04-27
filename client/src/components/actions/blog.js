import {
  commentBlog,
  createBlog,
  fetchBlog,
  fetchBlogDetail,
  searchCategory,
  updateBlog,
} from "../../store/slices/blogSlices";
import * as api from "../api/index.js";

export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchBlogDetails(id);

    dispatch(fetchBlogDetail({ blog: data }));
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBlog();
    dispatch(fetchBlog(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createBlog(post);
    console.log(data);
    dispatch(createBlog(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentBlog(value, id);
    console.log(data);
    dispatch(commentBlog(data));
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByCategory = (category) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchBlogByCategory(category);
    dispatch(searchCategory(data));
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateBlog(id, post);
    dispatch(updateBlog(data));
  } catch (error) {
    console.log(error);
  }
};
