import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSlice } from "../../store/themeSlice";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import { auth, logout } from "../../config/firebase";

import "./nav.css";
import { MaterialUISwitch } from "../../shema/MaterialUISwitch";

function Nav() {
 





  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: "none" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", m: "10px" }}
              onClick={() => navigate("/")}
            >
              Pocetna
            </Typography>

            {authState.id || userAuth ? (
              <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", m: "10px" }}
                onClick={() => navigate("/mojioglasi")}
              >
                Moji oglasi
              </Typography>
            ) : null}

            <Button
              style={{ color: "white", marginRight:"auto" }}
              variant="outlined"
              onClick={()=> navigate("/dodajoglas")}
            >
              Dodaj oglas
            </Button>
            {/* <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              label="en"
              value={localStorage.getItem("i18nextLng")}
							onChange={handleLangChange}
              className="nav-select"
            >
              <MenuItem value={"en"}>ENG</MenuItem>
              <MenuItem value={"sr"}>SRB</MenuItem>
            </Select> */}

            {authState.id || userAuth ? (
              <Button
                style={{ color: "white" }}
                variant="outlined"
                onClick={logout}
              >
                Odloguj me
              </Button>
            ) : (
              <Button
                style={{ color: "white" }}
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Uloguj me
              </Button>
            )}
            {authState.id || userAuth ? null : (
              <Button color="inherit" onClick={() => navigate("/registracija")}>
                Registracija
              </Button>
            )}
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  selected
                  onChange={() => {
                    dispatch(themeSlice.actions.toggleTheme());
                  }}
                  checked={themeState.theme === "dark"}
                />
              }
            />
             <Typography
              variant="h6"
              component="div"
              sx={{  m: "10px", color:"lightgrey" }}
            >
              {authState?.username}
            </Typography>
          </Toolbar>
        </AppBar>
        
      </Box>
    </div>
  );
}

export default Nav;
