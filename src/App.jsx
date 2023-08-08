import React from "react";
import { Route, Routes } from "react-router-dom";
import Pocetna from "./pages/pocetna/Pocetna";
import Oglas from "./pages/oglas/Oglas";
import Korisnik from "./pages/korisnik/Korisnik";
import Registracija from "./pages/registracija/Registracija";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { themeLight } from "./style/themeLight";
import { themeDark } from "./style/themeDark";
import { ThemeProvider } from "@mui/material";
import "./app.css"
import MojiOglasi from "./pages/mojiOglasi/MojiOglasi";
import DodajOglas from "./pages/dodajOglas/DodajOglas";

function App() {
  const themeState = useSelector((state) => state.theme);
  const selectedTheme = themeState.theme === "light" ? themeLight : themeDark;
  
  return (
    <ThemeProvider theme={selectedTheme}>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/oglas" element={<Oglas />} />
        <Route path="/korisnik" element={<Korisnik />} />
        <Route path="/mojioglasi" element={<MojiOglasi />} />
        <Route path="/dodajoglas" element={<DodajOglas />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
