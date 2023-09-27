import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsersById, logout, resetPassword } from "../../config/firebase";
import Layout from "../../containers/Layout";

import "./profil.css";
import { Box, Button } from "@mui/material";

function Profil() {
  const [userData, setUserData] = useState([]);
  const params = useParams();
  const navigate = useNavigate()

  const getUsersData = async () => {
    const usersResult = await getUsersById(params.id);
    setUserData(usersResult);
  };

  const changePassword = async () => {
    await resetPassword(userData.email);
    await logout()
    navigate('/login')
    alert('Proverite svoj e-mail')
  }

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <Layout>
      <Box className="profil-main">
        <h1>{userData.username?.toUpperCase()}</h1>
        <br />
        <hr />

        <Box className="profil-info-cont">
          <h2>Profil</h2>
          <p>
            {" "}
            <span className="profil-info-data">Ime i prezime: </span>{" "}
            {userData.ime_prezime}
          </p>
          <p>
            <span className="profil-info-data"> Grad: </span> {userData.grad}
          </p>
          <p>
            <span className="profil-info-data"> Clan od: </span>{" "}
            {userData.datum_prijave}
          </p>
          <p>
            <span className="profil-info-data"> Broj telefona: </span>{" "}
            {userData.broj_telefona}
          </p>
          <br />
          <hr />
        </Box>

        <Box className="profil-change-password">
          <h2>Promeni šifru</h2>
        <p>
          {/* Need a little (password) change? We got you. Just hit the button below
          and we'll send an email to filip28r@gmail.com with a link to change
          your password. */}
          Zaboravili ste šifru? Samo pritisnite na dugme ispod i poslaćemo Vam link za promenu šifre na mail: 
          <span style={{color:'#5268ff', fontWeight:"600"}}> {userData.email}</span>.
        </p>
        <Button style={{backgroundColor:'#5268ff', color:"white", marginTop:'20px'}}
        onClick={changePassword}
        >Promeni šifru</Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Profil;
