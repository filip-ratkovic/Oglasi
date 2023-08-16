import React, { useEffect, useState } from "react";
import Layout from "../../containers/Layout";
import { auth, getOglase } from "../../config/firebase";
import { Box, InputAdornment, TextField } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import SearchIcon from '@mui/icons-material/Search';

import "./pocetna.css";
import Filteri from "../../components/Filteri";
function Pocetna() {
  const [oglasi, setOglasi] = useState([]);
  const [search, setSearch] = useState("");
  const [filters,setFilters] = useState([])
  const [pocetnaStyle, setPocetnaStyle] = useState({display:{display:"flex"}, width:{width:"30%"}})

  console.log(filters)

  const userAuth = auth?.currentUser?.uid;
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const getFilters = (data) => {
    setFilters(data)
  }

  console.log(oglasi)
  useEffect(() => {
    getOglase()
      .then((data) => {
        setOglasi(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <div className="pocetna-container">
        <Filteri   getFilters={getFilters}
        />
        <Box className="pocetna-oglasi-container">
          <Box className="pocetna-oglasi-info">
            <Box className="pocetna-raspored">
              <AppsIcon  onClick={()=> setPocetnaStyle({display:{display:"flex"},width:{width:"30%"}})}/>
              <DensityMediumIcon onClick={()=> setPocetnaStyle({display:{display:"flex"},width:{width:"100%"}})} />
            </Box>
            <Box className="pocetna-broj-oglasa">
              Broj oglasa: {oglasi.length}
            </Box>
            <Box className="pocetna-search">
              <TextField
                onChange={handleSearch}
                id="input-with-icon-textfield"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          <Box className="pocetna-oglasi" style={pocetnaStyle.display}>
            {oglasi.map((oglas) => {
              if(oglas.naziv.toLowerCase().includes(search) && 
              (filters.kategorija === oglas.kategorija ||  filters.kategorija === "All")
              && filters.stanje === oglas.stanje){
                return (
                  <div
                  className="pocetna-oglas-card"
                    style={pocetnaStyle.width}
                  >
                    <h1>{oglas.naziv}</h1>
                    <p>{oglas.opis}</p>
                    <p>{oglas.cena}</p>
                    <p>{oglas.broj_elefona}</p>
                    <p>{oglas.stanje}</p>
                    <p>{oglas.kategorija}</p>
                    <p>{oglas.lokacija}</p>
                    <h1>{oglas.username}</h1>
                    <p>vreme postavljanja oglasa : {oglas.datum}</p>
                    <div>
                      {oglas.img?.map((url) => {
                        return (
                          <img
                            src={url}
                            alt="slslsa"
                            style={{ width: "100px", margin: "10px" }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </Box>
        </Box>
      </div>
    </Layout>
  );
}

export default Pocetna;
