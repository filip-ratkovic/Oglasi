import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  id: JSON.parse(localStorage.getItem("userAuth"))?.id || null,
  email: JSON.parse(localStorage.getItem("userAuth"))?.email || null,
  token: JSON.parse(localStorage.getItem("userAuth"))?.token || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setData(state, actions) {
      const data = actions.payload;
      state = data;
      return state;
    },
    logout(state, actions) {
      localStorage.setItem("auth",{})
      return (initialState = {
        id: null,
        email: null,
        token: null,
      });
    },
  },
});
