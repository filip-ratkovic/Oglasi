import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { themeSlice } from "./themeSlice";
import { userSlice } from "./userSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
  user: userSlice.reducer,
});