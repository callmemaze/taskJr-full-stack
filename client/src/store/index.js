import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import errorSlices from "./slices/errorSlices";
import blogSlices from "./slices/blogSlices";

const store = configureStore({
  reducer: {
    users: userSlice,
    errors: errorSlices,
    blog: blogSlices,
  },
});

export default store;
