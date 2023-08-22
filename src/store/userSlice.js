import { createSlice } from "@reduxjs/toolkit";

let initialState = {
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state
    },
    logout: (state, action) => {
      return initialState ={};
    },
  },
});
