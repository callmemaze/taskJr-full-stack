import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    errors: null,
  },
  reducers: {
    fetchBlogDetail(state, action) {
      return { ...state, blog: action.payload.blog };
    },
    fetchBlog(state, action) {
      return action.payload;
    },
    createBlog(state = [], action) {
      return [...state, action.payload];
    },
    commentBlog(state = [], action) {
      return {
        ...state,
        blogs: state.blogs.map((blog) => {
          if (blog._id === action.payload._id) {
            return action.payload;
          }
          return blog;
        }),
      };
    },
    searchCategory(state, action) {
      return { ...state, blog: action.payload };
    },
    updateBlog(state, action) {
      return {
        ...state,
        blog: state.blog.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    },
  },
});

export default blogSlice.reducer;
export const {
  fetchBlog,
  createBlog,
  fetchBlogDetail,
  commentBlog,
  searchCategory,
  updateBlog,
} = blogSlice.actions;
