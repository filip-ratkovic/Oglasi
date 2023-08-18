import { Box } from "@mui/material";
import React, { useState } from "react";
import "./oglasiCard.css";
import { useNavigate } from "react-router-dom";

function OglasiCard2({ oglas }) {
  const [readMore, setReadMore] = useState(false);
  const navigate= useNavigate();
  
  return (
    <Box className="card2-container"
    onClick={()=>{navigate(`/oglas/${oglas.id}`)}}
    >
      <Box className="card2-img">
        <img src={oglas.img[0]} alt={oglas.naziv} />
      </Box>
      <Box className="card2-text">
        <Box className="card2-naziv">
          <Box id="card2-naziv">
            <h3>{oglas.naziv}</h3>
          <h3 className="cena-gold" id="price-first">
            {oglas.cena} {oglas.valuta === "din" ? "RSD" : "€"}
          </h3>

          </Box>
          <p style={{ marginTop: "10px" }}
          id="card2-test-first">
            {oglas.opis.length < 150
              ? oglas.opis
              : `${oglas.opis.substring(0, 200)} ...`}
          </p>
        </Box>
        <Box className="card2-ocena">
          <p style={{ marginTop: "10px" }}>{oglas.lokacija}</p>
        </Box>
      </Box>
    </Box>
  );
}

export default OglasiCard2;
