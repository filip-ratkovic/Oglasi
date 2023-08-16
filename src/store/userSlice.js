// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user : null,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {
//     setUser(state, actions) {
//       return state.user
//     },
//     logout(state, actions) {
//       return (initialState = {
//       });
//     },
//   },
// });

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
