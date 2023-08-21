import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSlice } from "../../store/themeSlice";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, MenuItem, Switch, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from '@mui/icons-material/Person';
import { auth, logout } from "../../config/firebase";
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import "./nav.css";
import { MaterialUISwitch } from "../../shema/MaterialUISwitch";

const pages = ['Pocetna', 'Dodaj oglas', 'Moji oglasi'];
const settings = ['Profil', 'Pratim', 'Logout'];


function Nav() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme()
  const themeState = useSelector((state) => state.theme);
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const userAuth = auth?.currentUser?.uid;


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
      <Box sx={{ flexGrow: 1, position:"sticky", top:"0", zIndex:"111" }}>
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LoyaltyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: theme.palette.text.primary,
              textDecoration: 'none',
              cursor:"pointer"
            }}
            onClick={()=>navigate("/")}
          >
            OGLASI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', mt:"10px" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} 
                onClick={handleCloseNavMenu} 
                style={{backgroundColor:theme.palette.primary.main}}>
                  <Typography textAlign="center"
                   onClick={()=>{
                    const link = page.replaceAll(' ', '');
                    page === "Pocetna" ? navigate("/") :
                    navigate(`/${link.toLowerCase()}`)
                  }}>{page}</Typography>
                </MenuItem>
              ))}
              {authState.id || userAuth ? (
              <MenuItem
                variant="outlined"
                onClick={logout}
                style={{backgroundColor:theme.palette.primary.main}}>
              
                Odloguj me
              </MenuItem>
            ) : (
              <MenuItem
                variant="outlined"
                onClick={() => navigate("/login")}
                style={{backgroundColor:theme.palette.primary.main}}>
              
                Uloguj me
              </MenuItem>
            )}

            {authState.id || userAuth ? null : (
              <MenuItem                 style={{backgroundColor:theme.palette.primary.main}}
              onClick={() => navigate("/registracija")}>
                Registracija
              </MenuItem>
            )}
            </Menu>
          </Box>
          
          <LoyaltyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor:"pointer"
            }}
            onClick={()=>navigate("/")}
          >
            OGLASI
          </Typography>

          <FormControlLabel
          sx={{ display: { xs: 'flex', md: 'none' }}}
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

          

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           <Box style={{display:"flex", marginRight:"auto"}}>
           {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{
                  const link = page.replaceAll(' ', '');
                  page === "Pocetna" ? navigate("/") :
                  navigate(`/${link.toLowerCase()}`)}}
                sx={{ my: 2, display: 'block' }}
                style={{color:theme.palette.text.primary}}
              >
                {page}
              </Button>
            ))}
           </Box>
              {authState.id || userAuth ? (
              <Button
                style={{ color:theme.palette.text.primary }}
                variant="outlined"
                onClick={logout}
              >
                Odloguj me
              </Button>
            ) : (
              <Button
                style={{ color:theme.palette.text.primary }}
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Uloguj me
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
          </Box>

          {authState.id || userAuth?  <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Otvori user meni">
              <PersonIcon onClick={handleOpenUserMenu}
               sx={{ p: 0, cursor:"pointer", fontSize:"30px",color:theme.palette.text.primary}}>
              </PersonIcon>
            </Tooltip>
            <Menu
              sx={{ mt: '55px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
              
                <MenuItem key="profil" onClick={handleCloseUserMenu}
                              style={{backgroundColor:theme.palette.primary.main}}
                              >
                  <Typography textAlign="center" onClick={()=>navigate(`/profil/${userState.userID}`)}>Profil</Typography>
                </MenuItem>

                <MenuItem key="Pratim" onClick={handleCloseUserMenu}
                              style={{backgroundColor:theme.palette.primary.main}}
                              >
                  <Typography textAlign="center" onClick={()=>navigate(`/pratim`)}>Pratim</Typography>
                </MenuItem>

                <MenuItem key="logout" onClick={logout}
                              style={{backgroundColor:theme.palette.primary.main}}
                              >
                  <Typography textAlign="center" onClick={logout}>Odjavi se</Typography>
                </MenuItem>
              
            </Menu>
          </Box> : null}
        </Toolbar>
      </Container>
    </AppBar>
      </Box>
  );
}

export default Nav;
