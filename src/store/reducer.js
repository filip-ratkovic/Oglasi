import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { themeSlice } from "./themeSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer
});