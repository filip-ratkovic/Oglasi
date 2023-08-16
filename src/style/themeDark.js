import { createTheme } from "@mui/material/styles";

export const themeDark = createTheme({
  palette: {
    primary: {
      main: "#2e9959",
      light: "#6bb771",
    },
    secondary : {
      main: "#252d32"
    },
   
    background: "#303f57", //black
    text: {
      primary: "#f5f4f5",
      secondary: "#d3d1cb",
        // disabled: "#ccc",
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