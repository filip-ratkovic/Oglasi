import React from "react";
import "../../pages/oglas/oglas.css";
import { Box, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function OglasText(props) {
  const adData = props.adData;
  return (
    <Box className="ad-text-container">
      <h1>{adData?.naziv}</h1>
      <Box style={{ marginBlock: "20px" }} className="ocene-i-prati">
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

        <Box className="ocene-pozitivne">
          <p>Pozitivne</p>
          <p>Negativne</p>
        </Box>
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
