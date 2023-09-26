import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import { ocenaSchema } from "../../shema/ocenaShema";
import {  updateUser } from "../../config/firebase";
import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import {ThumbUp as ThumbUpIcon, ThumbDownAlt as ThumbDownAltIcon, Clear as ClearIcon} from "@mui/icons-material";
import "./dodajKomentar.css";

function DodajKomentar({ adActive, setAdActive, user,adData, mainUser}) {
  const authState = useSelector((state) => state.auth);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleExitComment = () => {
    setAdActive(false);
  };
  const potvrdiOcenu = async (values) => {
    const pozitivnaOcena = user.pozitivna_ocena;
    const negativnaOcena = user.negativna_ocena;
    const ocene = user.ocene
    let isRate = false;
    try {
      user.ocene?.map((users) => {
        authState.id === users ? (isRate = true) : (isRate = false);
      });
      if (isRate) {
        alert("Vec ste ocenili");
      } else {
        ocene.push(authState.id)
        if (values.ocena === "pozitivna") {
          pozitivnaOcena.push({ ...values, user: authState.id, ime: mainUser.ime_prezime });

          await updateUser(user.id, {
            ...user,
            pozitivna_ocena: pozitivnaOcena,
            ocene : ocene
          });
        } else if(values.ocena === "negativna") {
          negativnaOcena.push({ ...values, user: authState.id });
          await updateUser(user.id, {
            ...user,
            negativna_ocena: negativnaOcena,
            ocene : ocene
          });
        }
        alert("uspesno");
        setAdActive(false);
        navigate(`/oglas/${adData.id}`);
      }
    } catch (error) {
      alert(error);
    }
  };


  return (
    <Box
      className={`${
        adActive ? "dodaj-komentar dodaj-active" : "dodaj-komentar"
      }`}
    >
      <Box className="dodaj-container">
        <ClearIcon onClick={handleExitComment} 
        style={{color:"black"}}
        className="exit-btn" />
        <p id="dodaj-header">Dodaj komentar</p>
        <Box className="dodaj-info-cont">
          <Formik
            initialValues={{
              komentar: "",
              komunikacija: "dobra",
              dogovor: "da",
              ocena: "pozitivna",
            }}
            validationSchema={ocenaSchema}
            onSubmit={(values, actions) => {
              potvrdiOcenu(values);
            }}
            style={{ backgroundColor: theme.palette.secondary.main }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box my={1}>
                  <TextField
                    select
                    label="Ocena"
                    id="ocena"
                    name="ocena"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ocena}
                    style={{ width: "400px", maxWidth: "80%" }}
                    sx={{
                      "& label": {
                        color: "grey",
                      },
                    }}
                  >
                    <MenuItem value={"pozitivna"} selected>
                      <ThumbUpIcon />
                    </MenuItem>
                    <MenuItem value={"negativna"}>
                      <ThumbDownAltIcon />
                    </MenuItem>
                  </TextField>
                  <Typography variant="body2" color="error">
                    {errors.ocena && touched.ocena && `* ${errors.ocena}`}
                  </Typography>
                </Box>

                <Box my={1}>
                  <TextField
                    select
                    label="Komunikacija"
                    id="komunikacija"
                    name="komunikacija"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.komunikacija}
                    style={{ width: "400px", maxWidth: "80%" }}
                    sx={{
                      "& label": {
                        color: "grey",
                      },
                    }}
                  >
                    <MenuItem value={"dobra"} selected>
                      Dobra
                    </MenuItem>
                    <MenuItem value={"losa"}>Losa</MenuItem>
                  </TextField>
                  <Typography variant="body2" color="error">
                    {errors.komunikacija &&
                      touched.komunikacija &&
                      `* ${errors.komunikacija}`}
                  </Typography>
                </Box>

                <Box my={1}>
                  <TextField
                    select
                    label="Ispostovan dogovor"
                    id="dogovor"
                    name="dogovor"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dogovor}
                    style={{ width: "400px", maxWidth: "80%" }}
                    sx={{
                      "& label": {
                        color: "grey",
                      },
                    }}
                  >
                    <MenuItem value={"da"} selected>
                      Da
                    </MenuItem>
                    <MenuItem value={"ne"}>Ne</MenuItem>
                  </TextField>
                  <Typography variant="body2" color="error">
                    {errors.dogovor && touched.dogovor && `* ${errors.dogovor}`}
                  </Typography>
                </Box>

                <Box my={1}>
                  <TextField
                    variant="standard"
                    label="Komentar"
                    id="komentar"
                    name="komentar"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.komentar}
                    style={{ width: "400px", maxWidth: "80%" }}
                    sx={{
                      "& label": {
                        color: "grey",
                      },
                    }}
                  />
                  <Typography variant="body2" color="error">
                    {errors.komentar &&
                      touched.komentar &&
                      `* ${errors.komentar}`}
                  </Typography>
                </Box>

                <Box
                  mt={5}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "410px",
                    gap: "30px",
                  }}
                >
                  <Button
                    onClick={handleSubmit}
                    type="button"
                    variant="contained"
                    style={{ width: "50%" }}
                  >
                    Potvrdi
                  </Button>
                </Box>
              </Container>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default DodajKomentar;
