import React from 'react'
import { Box, Grid } from '@mui/material';
import "./oglasiCard.css"

function OglasiCard({oglas}) {

  return (
    <Box className="card-container">
    <Box className="pocetna-card-img">
    <img src={oglas.img[0]} alt={oglas.naziv} />
    {/* <div>
      {oglas.img?.map((url) => {
          return (
              <img
              src={url}
              alt="slslsa"
              style={{ width: "100px", margin: "10px" }}
              />
              );
            })}
        </div> */}
    </Box>
        <Box className="pocetna-card-text">
        <p>{oglas.naziv}</p>
        <p className='cena-gold'>{oglas.cena} {oglas.valuta === "din" ? "RSD" : "€"}</p>
        </Box>
    </Box>
  )
}

export default OglasiCard