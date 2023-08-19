import React from "react";
import "../../pages/oglas/oglas.css";
import { Box, Button, ButtonGroup } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function OglasText(props) {
  const adData = props.adData;
  return (
    <Box className="ad-text-container">
      <Box className="ocene-i-prati">
        <h1>{adData?.naziv}</h1>
        <h2>{adData?.ime_prezime?.toUpperCase()}</h2>
      </Box>
      <Box className="ocene-i-prati">
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

        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button><ThumbUpIcon/></Button>
          <Button><ThumbDownAltIcon/></Button>
        </ButtonGroup>
      </Box>
      <h2 className="cena-gold" style={{ marginBottom: "20px" }}>
        {adData.cena} {adData.valuta === "din" ? "RSD" : "€"}
      </h2>
      <p>{adData.opis}</p>
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
      <Box>
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
  );
}

export default OglasText;
