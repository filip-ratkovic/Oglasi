import React, { useState } from "react";
import "../../pages/oglas/oglas.css";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DodajKomentar from "./DodajKomentar";

function OglasText(props) {
  const [adActive, setAdActive] = useState(false);
  const adData = props.adData;
  const theme = useTheme();

  const handleAdComment = () => {
    setAdActive(true);
  };



  return (
    <Box className="ad-text-container">
      <DodajKomentar adActive={adActive} setAdActive={setAdActive}/>
      <Box className="ad-text-up">
        <Box className="ad-text-header">
          <h1>{adData?.naziv}</h1>
          <h2 className="cena-gold" style={{ marginBottom: "20px" }}>
            {adData.cena} {adData.valuta === "din" ? "RSD" : "€"}
          </h2>
          <Box className="ad-small-det-cont">
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Stanje:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.stanje}</p>
            </Box>
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Zamena:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.zamena}</p>
            </Box>
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Kategorija:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.kategorija}</p>
            </Box>
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Grad:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.lokacija}</p>
            </Box>
          </Box>
        </Box>

        <Box className="ad-text-userinfo">
          <Box className="add-first-cont">
            <PersonIcon style={{ color: theme.palette.primary.main }} />
            <h2>{adData?.ime_prezime?.toUpperCase()}</h2>
          </Box>
          <Button
            size="small"
            variant="contained"
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Prati <BookmarkIcon />{" "}
          </Button>
          <p>Ćlan od 25.06.2023.</p>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button
              onClick={handleAdComment}
              variant="outlined"
              style={{
                marginRight: "10px",
                borderRadius: "30px",
                color: "#007ec3",
                width: "80px",
              }}
            >
              <ThumbUpIcon style={{ marginRight: "5px" }} /> 23
            </Button>
            <Button
              onClick={handleAdComment}
              variant="outlined"
              style={{ borderRadius: "30px", color: "red", width: "80px" }}
            >
              <ThumbDownAltIcon style={{ marginRight: "5px" }} />1
            </Button>
          </ButtonGroup>

          <Button
            variant="contained"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Posalji poruku
            <SendIcon />
          </Button>
        </Box>
      </Box>

      <Box className="ocene-i-prati"></Box>
      <Box className="ocene-i-prati"></Box>

      <p>{adData.opis}</p>

      <Box></Box>
    </Box>
  );
}

export default OglasText;
