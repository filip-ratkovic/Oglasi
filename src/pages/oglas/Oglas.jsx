import React, { useEffect, useState } from "react";
import "./oglas.css";
import { useNavigate, useParams } from "react-router-dom";
import { getOglasById, getUsers } from "../../config/firebase";
import { Box, Button, useTheme } from "@mui/material";
import OglasImage from "../../components/singlePage/OglasImage";
import Layout from "../../containers/Layout";
import OglasText from "../../components/singlePage/OglasText";
import Ocene from "../../components/ocene/Ocene";
import { useSelector } from "react-redux";

function Oglas() {
  const [adData, setAdData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [user, setUser] = useState([]);
  const [mainUser, setMainUser] = useState([])
  const theme = useTheme()

  const getAdData = async () => {
    const adRes = await getOglasById(params.id);
    setAdData(adRes);
    getUsersData(adRes)
  };

  const getUsersData = async (data) => {
    const userRes = await getUsers();
    
    userRes.forEach((currentUser, index) => {
      if (currentUser.userID === data.userID) {
        setUser(currentUser);
      }
      if(currentUser.userID === authState.id) {
        setMainUser(currentUser)
      }
    });
  };
  
  useEffect( () => {
    getAdData();
 }, []);

  return (
    <Layout>
      <Box style={{ width: "100%", position: "relative" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          style={{ margin: "20px 50px", backgroundColor:theme.palette.text.primary, color:theme.palette.background}}
        >
          Nazad na početnu
        </Button>
        <Box className="ad-container" style={{color:theme.palette.text.primary}}
>
          <OglasImage adData={adData} />

        <OglasText adData={adData} user={user} mainUser={mainUser}/>
        </Box>
        <Ocene adData={adData} user={user}/>
      </Box>
    </Layout>
  );
}

export default Oglas;
