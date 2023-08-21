import { createTheme } from "@mui/material/styles";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#ffffff",  //white/smoke
      light: "#c1c1c1",  //lightGrey
    },
    secondary : {
      main: "#475866" //darkGrey
    },
    background: "#fafafa",  //white
    text: {
      primary: "#020208",  // black
      secondary: "#0f1f2b", //black /light
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
  
});