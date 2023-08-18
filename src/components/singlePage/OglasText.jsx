import React from "react";
import "../../pages/oglas/oglas.css";
import { Box, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function OglasText(props) {
  const adData = props.adData;
  console.log(adData);
  return (
    <Box className="ad-text-container">
      <Box className="add-first-cont">
      <h1>{adData?.naziv}</h1>
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
      <h2 className="cena-gold">
        {adData.cena} {adData.valuta === "din" ? "RSD" : "€"}
      </h2>
      </Box>
      <p>{adData.opis}</p>
      <Box className="ad-small-det-cont">
        <Box className="ad-small-det-left">
          <Box className="ad-small-det-text-left">
            <h4>Stanje:</h4>
          </Box>
          <p style={{color:"grey"}}>{adData.stanje}</p>
        </Box>
        <Box className="ad-small-det-left">
          <Box className="ad-small-det-text-left">
            <h4>Zamena:</h4>
          </Box>
          <p style={{color:"grey"}}>{adData.zamena}</p>
        </Box>
        <Box className="ad-small-det-left">
          <Box className="ad-small-det-text-left">
            <h4>Kategorija:</h4>
          </Box>
          <p style={{color:"grey"}}>{adData.kategorija}</p>
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
          Posalji poruku <BookmarkIcon />{" "}
        </Button>
      </Box>
    </Box>
  );
}

export default OglasText;
