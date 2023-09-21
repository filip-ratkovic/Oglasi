import React, {  useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PersonIcon from "@mui/icons-material/Person";
import "./ocene.css";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { updateUser } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function Ocene({user, mainUser}) {
  const [statusOcene, setStatusOcene] = useState(true);
  const [ocena, setOcena] = useState()
  const theme = useTheme()
  const navigate = useNavigate()

  const handleDeleteOcena = async (e) => {
   try{
    const newOcena = ocena.pozitivna_ocena?.filter((userID) => e.target.id !== userID.user);
    const sveOcene = ocena.ocene.filter((ocena) => ocena !== e.target.id)
    await updateUser(ocena.id, {ocena, pozitivna_ocena : newOcena, ocene:sveOcene})
    alert('uspesno')
    getUserData({ocena, pozitivna_ocena : newOcena, ocene:sveOcene})
    navigate('/')
   }catch (error) {
      console.log(error)
   }
  }
  console.log(ocena)

const getUserData = (data) => {
  setOcena(data)
}
  useEffect(()=>{
    getUserData(user)
    },[user])

  return (
    <Box className="ocene-container">
      <Box className="ocene-header">
        <Box>
          <h2>Ocene korisnika</h2>
        </Box>
        <Box className="ocene-pozitivne">
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button
            className={`${statusOcene ? 'ocena-active' : ''}`}
              variant="outlined"
              style={{
                marginRight: "10px",
                borderRadius: "30px",
                width: "100px",
                 height:"50px",
                color: "#007ec3",
                borderColor:theme.palette.background
              }}
              onClick={()=> {
                setStatusOcene(true)
              }}
            >
              <ThumbUpIcon style={{ marginRight: "5px" }} />{" "}
              {ocena?.pozitivna_ocena?.length}
            </Button>
            <Button
              className={`${!statusOcene ? 'ocena-active' : ''}`}
              variant="outlined"
              style={{ borderRadius: "30px", color: "red", width: "100px", height:"50px" }}
              onClick={()=> {
                setStatusOcene(false)
              }}
            >
              <ThumbDownAltIcon style={{ marginRight: "5px" }} />{" "}
              {ocena?.negativna_ocena?.length}
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
     {statusOcene ? 
      <Box className="ocene-korisnika">
      {ocena?.pozitivna_ocena?.map((ocena) => {
        return (
          <Box className="ocene-card">
                          <Box className="add-first-cont">
            <PersonIcon style={{ color: theme.palette.primary.main }} />
            <p style={{color:"grey"}}>{ocena.ime?.toUpperCase()}</p>
          </Box>
            <Box className="ocene-card-select">
              <p>Komunikacija: {ocena.komunikacija}</p>
              <p>Ispostovan dogovor: {ocena.dogovor}</p>
              <p>Ocena: {ocena.ocena}</p>
            </Box>
            <Box className="ocene-card-komentar">
            <p id="komentar">Komentar : {ocena.komentar}</p>

            </Box>
            {mainUser.userID === ocena.user ? 
            <Button color="error" id={ocena.user} onClick={handleDeleteOcena}>Delete</Button> : null}
          </Box>
        );
      })}
    </Box> :  <Box className="ocene-korisnika">
        {user.negativna_ocena?.map((ocena) => {
          return (
            <Box className="ocene-card">
   <Box className="add-first-cont">
            <PersonIcon style={{ color: theme.palette.primary.main }} />
            <p style={{color:"grey"}}>{ocena.ime?.toUpperCase()}</p>
          </Box>              <Box className="ocene-card-select">
                <p>Komunikacija: {ocena.komunikacija}</p>
                <p>Ispostovan dogovor: {ocena.dogovor}</p>
                <p>Ocena: {ocena.ocena}</p>
              </Box>
              <Box className="ocene-card-komentar">
              <p id="komentar">Komentar : {ocena.komentar}</p>

              </Box>
            </Box>
          );
        })}
      </Box>}
    </Box>
  );
}

export default Ocene;
