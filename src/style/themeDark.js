import { createTheme } from "@mui/material/styles";

export const themeDark = createTheme({
  palette: {
    primary: {
      main: "#0e1e2a", //blackcard
      light: "#21323f",  //blacklightcard
    },
    secondary : {
      main: "#475866" //dark grey
    },
   
    background: "#06141b", //black
    text: {
      primary: "#fafafa",  //white
      secondary: "#93a0a3", //white darker
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