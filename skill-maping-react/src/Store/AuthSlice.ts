import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  token: null,
};
const authSlice = createSlice({
  name: "token",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    }
  },
});
export const { login, logout } = authSlice.actions
export default authSlice.reducer;