import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Pocetna from "./pages/pocetna/Pocetna";
import Oglas from "./pages/oglas/Oglas";
import Korisnik from "./pages/korisnik/Korisnik";
import Registracija from "./pages/registracija/Registracija";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { themeLight } from "./style/themeLight";
import { themeDark } from "./style/themeDark";
import { ThemeProvider } from "@mui/material";
import "./app.css";
import MojiOglasi from "./pages/mojiOglasi/MojiOglasi";
import DodajOglas from "./pages/dodajOglas/DodajOglas";
import { getUsers } from "./config/firebase";
import { authSlice } from "./store/authSlice";
import { userSlice } from "./store/userSlice";
import { store } from "./store/store";
import Pratim from "./pages/pratim/Pratim";
import Profil from "./pages/profil/Profil";

function App() {
  const themeState = useSelector((state) => state.theme);
  const currentUser = useSelector((state)=> state.auth)
  const [users, setUsers] = useState([]);

  const authState = useSelector((state) => state.auth);
  const selectedTheme = themeState.theme === "light" ? themeLight : themeDark;

  const RequireAuth = ({ children }) => {
    return currentUser.id ? children : <Navigate to={"/login"} />;
  };

  useEffect(()=> {
    users.map((user)=>{
      if(user.email === authState.email) {
        store.dispatch(
          authSlice.actions.setData({...authState, username:user.username}))
          localStorage.setItem("mainUser", JSON.stringify(user))
          store.dispatch(userSlice.actions.setUser(user))
      }
     
    })

},[users])

  useEffect(()=> {
    localStorage.setItem("userAuth", JSON.stringify(currentUser))
  },[currentUser])

  useEffect(()=> {
    getUsers()
    .then((data) => {
      setUsers(data);
    })
  },[])
  
  return (
    <ThemeProvider theme={selectedTheme}>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/oglas/:id" element={<Oglas />} />
        <Route path="/korisnik" element={<Korisnik />} />
        <Route path="/pratim" element={<Pratim />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route
          path="/mojioglasi"
          element={
            <RequireAuth>
              <MojiOglasi />
            </RequireAuth>
          }
        />
        <Route
          path="/dodajoglas"
          element={
            <RequireAuth>
              <DodajOglas />
            </RequireAuth>
          }
        />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
