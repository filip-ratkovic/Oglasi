import React, { useState } from 'react'
import { Box } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";
import "./dodajKomentar.css"


function DodajKomentar({adActive, setAdActive}) {
    const [ocenaData, setOcenaData] = useState({});

    const handleExitComment = () => {
        setAdActive(false);
      };

      const handleInput = () => {
        const value = e.target.value;
        const inputID = e.target.name;
        setOcenaData({ ...ocenaData, [inputID]: value });
      }


  return (
    <Box className={`${adActive ? 'dodaj-komentar dodaj-active' : "dodaj-komentar"}`}>
    <Box className="dodaj-container">
      <ClearIcon onClick={handleExitComment} className="exit-btn" />
      <p id='dodaj-header'>Dodaj komentar</p>
      <Box className="dodaj-info-cont">
            {/* <Box className="dodaj-select">
            <TextField
              select
              label="Istostovan dogovor"
              name="dogovor"
              id="dogovor"
              onChange={handleInput}
            //   style={{ width: "40%" }}
            >
              <MenuItem value={"da"} selected>
                Da
              </MenuItem>
              <MenuItem value={"ne"}>Ne</MenuItem>
            </TextField>
            </Box>
            <Box className="add-comment">

            </Box> */}
      </Box>
    </Box>
  </Box>  )
}

export default DodajKomentar