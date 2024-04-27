import { errored } from "../../store/slices/errorSlices";
import { auth } from "../../store/slices/userSlice";
import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch(auth(data));
    navigate("/");
  } catch (error) {
    const data = error.response.data.message;
    dispatch(errored(data));
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch(auth(data));
    navigate("/");
  } catch (error) {
    console.log(error.response.data.message);
    const data = error.response.data.message;
    dispatch(errored(data));
  }
};
