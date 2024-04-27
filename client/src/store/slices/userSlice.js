import { signUp } from "../../components/api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    errors: null,
  },
  reducers: {
    auth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action.payload, errors: null };
    },
    logout(state, action) {
      localStorage.clear();
      return { ...state, authData: null, errors: null };
    },
  },
});

export default userSlice.reducer;
export const { auth, logout, errored } = userSlice.actions;
