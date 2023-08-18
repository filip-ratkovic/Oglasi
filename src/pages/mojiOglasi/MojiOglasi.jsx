import React, { useEffect, useState } from "react";
import Layout from "../../containers/Layout";
import OglasiCard2 from "../../components/oglasi/OglasiCard2";
import OglasiCard from "../../components/oglasi/OglasiCard";
import Filteri from "../../components/filteri/Filteri";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import SearchIcon from "@mui/icons-material/Search";
import { auth, getOglase } from "../../config/firebase";

function MojiOglasi() {
  const [oglasi, setOglasi] = useState([]);
  const userAuth = auth?.currentUser?.uid;
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [pocetnaStyle, setPocetnaStyle] = useState([12, 6, 4, 4]);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilters = (data) => {
    setFilters(data);
  };
 

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
        <Filteri getFilters={getFilters} />
        <Box className="pocetna-oglasi-container">
          <Box className="pocetna-oglasi-info">
        
            <Box className="pocetna-raspored" style={{marginRight:"auto"}}>
              <AppsIcon onClick={() => setPocetnaStyle([12, 6, 4, 4])} />
              <DensityMediumIcon
                onClick={() => setPocetnaStyle([12, 12, 12, 12])}
              />
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

          <Grid container className="pocetna-oglasi" spacing={3}>
            {oglasi.map((oglas) => {
              let cena = 0;
              if (oglas.valuta === "din") {
                cena = Number(oglas.cena);
              } else if (oglas.valuta === "eur") {
                cena = Number(oglas.cena * 118);
              }

              if (
                (oglas.userID === userAuth) &&
                oglas.naziv.toLowerCase().includes(search) &&
                (filters.kategorija === oglas.kategorija ||
                  filters.kategorija === "Sve") &&
                (filters.stanje === oglas.stanje || filters.stanje === "sve") &&
                filters.cena[0] <= cena &&
                filters.cena[1] >= cena
              ) {
                return (
                  <Grid
                    item
                    xs={pocetnaStyle[0]}
                    sm={pocetnaStyle[1]}
                    md={pocetnaStyle[2]}
                    lg={pocetnaStyle[3]}
                    className="pocetna-oglas-card"
                  >
                    {pocetnaStyle[2] === 12 ? (
                      <OglasiCard2 oglas={oglas} />
                    ) : (
                      <OglasiCard oglas={oglas} />
                    )}
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </div>
    </Layout>
  );
}

export default MojiOglasi;
