import React from "react";
import Nav from "../pages/nav/Nav";
import { Box, useTheme } from "@mui/material";

function Layout(props) {
  const theme = useTheme();

  return (
    <Box style={{ backgroundColor: theme.palette.background, minHeight: "100vh"}}>
      <Nav />
      <Box bgcolor={theme.palette.background}
       style={{display:"flex", justifyContent: "center", alignItems:"center"}}>
        {props.children}
      </Box>
    </Box>
  );
}

export default Layout;
