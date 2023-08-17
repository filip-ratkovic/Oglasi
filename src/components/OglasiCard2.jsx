import { Box } from '@mui/material'
import React, { useState } from 'react'
import "./oglasiCard.css"

function OglasiCard2({oglas}) {
    const [readMore, setReadMore] = useState(false)
  return (
    <Box className="card2-container">
        <Box className="card2-img">
        <img src={oglas.img[0]} alt={oglas.naziv} />
        </Box>
        <Box className="card2-text">
            <Box className="card2-naziv">
                <h3>{oglas.naziv}</h3>
                <p style={{marginTop:"10px"}}>
                   { oglas.opis.length<150 ? oglas.opis : `${oglas.opis.substring(0, 200)} ...`}
                </p>
            </Box>
            <Box className="card2-ocena">
            <h3 className='cena-gold'>{oglas.cena} {oglas.valuta === "din" ? "RSD" : "€"}</h3>
            <p>{oglas.lokacija}</p>
            </Box>
        </Box>
    </Box>
  )
}

export default OglasiCard2