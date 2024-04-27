import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    errors: null,
  },
  reducers: {
    errored(state, action) {
      return { errors: action.payload };
    },
  },
});

export default errorSlice.reducer;
export const { errored } = errorSlice.actions;
