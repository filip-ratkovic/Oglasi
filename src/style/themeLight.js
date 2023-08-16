import { createTheme } from "@mui/material/styles";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#2e9959",
      light: "#6bb771",
    },
    secondary : {
      main: "#dceae6"
    },
    background: "#fcfcfc",  //white
    text: {
      primary: "#19191c",
      secondary: "#242e34",
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