import React, {  useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PersonIcon from "@mui/icons-material/Person";
import "./ocene.css";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";

function Ocene({user }) {
  const [statusOcene, setStatusOcene] = useState(true)
  const theme = useTheme()


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
              variant="outlined"
              style={{
                marginRight: "10px",
                borderRadius: "30px",
                width: "100px",
                 height:"50px",
                color: "#007ec3",
              }}
              onClick={()=> {
                setStatusOcene(true)
              }}
            >
              <ThumbUpIcon style={{ marginRight: "5px" }} />{" "}
              {user.pozitivna_ocena?.length}
            </Button>
            <Button
              variant="outlined"
              style={{ borderRadius: "30px", color: "red", width: "100px", height:"50px" }}
              onClick={()=> {
                setStatusOcene(false)
              }}
            >
              <ThumbDownAltIcon style={{ marginRight: "5px" }} />{" "}
              {user.negativna_ocena?.length}
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
     {statusOcene ? 
      <Box className="ocene-korisnika">
      {user.pozitivna_ocena?.map((ocena) => {
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
