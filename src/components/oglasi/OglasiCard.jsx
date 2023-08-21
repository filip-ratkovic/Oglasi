import React from 'react'
import { Box, Grid, useTheme } from '@mui/material';
import "./oglasiCard.css"
import { useNavigate } from 'react-router-dom';

function OglasiCard({oglas}) {
  const navigate= useNavigate();
  const theme = useTheme()
  

  return (
    <Box className="card-container"
    onClick={()=>{navigate(`/oglas/${oglas.id}`)}}
  >
    <Box className="pocetna-card-img">
    <img src={oglas.img[0]} alt={oglas.naziv} />
    </Box>
        <Box className="pocetna-card-text">
        <p style={{color:theme.palette.text.primary}}>{oglas.naziv}</p>
        <p className='cena-gold'>{oglas.cena} {oglas.valuta === "din" ? "RSD" : "€"}</p>
        </Box>
    </Box>
  )
}

export default OglasiCard