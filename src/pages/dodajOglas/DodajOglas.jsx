import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, dodajOglas } from '../../config/firebase';
import { Formik } from "formik";
import * as yup from "yup";
import Layout from '../../containers/Layout';

import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  MenuItem,
  Select,
} from "@mui/material";

const dodajOglasShema = yup.object({
  text: yup
    .string()
    .required("text je obavezno polje")
    .min(6, "text mora da ima najmanje 6 karaktera")
    .max(300, "text mora da ima najvise 200 karaktera"),
  naziv: yup
    .string()
    .required("Naziv proizvoda je obavezno polje")
    .min(2, "Naziv proizvoda mora da ima najmanje 2 karaktera")
    .max(50, "Naziv proizvoda mora da ima najvise 50 karaktera"),
    cena: yup
    .number()
    .required("Cena je obavezno polje"),
    brojTelefona: yup
    .number(),
    lokacija: yup
    .string()
    .required("Lokacija je obavezno polje"),
    novo:yup
    .string()
});


function DodajOglas() {
    const navigate = useNavigate()
    const authState = useSelector((state) => state.auth);
    const userAuth = auth?.currentUser?.uid;
    const theme = useTheme();
  
  
    const potvrdiOglas = async (values) => {
      try {
        await dodajOglas(values);
        alert("Uspesno !")
        navigate("/")
      } catch(err) {
        console.error(err)
      }
    }
const date = new Date()
const godina = date.getFullYear()
const mesec = date.getMonth();
const dan = date.getDate();

    const datum =  `${dan}.${mesec}.${godina}`;
    

    useEffect(()=> {
        if (!userAuth) {
          navigate("/registracija");
          alert("nemate pristup");
        }
       })
  return (
<Layout>
      <Formik
        initialValues={{
          text: "",
          naziv: "",
          lokacija: "",
          cena:0,
          novo:"",
          kategorija: "",
          brojTelefona:0,
          vreme: datum,
          userID:userAuth
        }}
        validationSchema={dodajOglasShema}
        onSubmit={(values, actions) => {
           potvrdiOglas(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Box sx={{textAlign:"center"}}>

            <Box my={1}>
              <TextField
                variant="outlined"
                label="Naziv proizvoda"
                type="text"
                name="naziv"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.naziv}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.naziv && touched.naziv && errors.naziv}
              </Typography>
            </Box>

            <Box my={1}>
              <TextField
                variant="outlined"
                label="Opis proizvoda"
                type="text"
                name="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.text && touched.text && errors.text}
              </Typography>
            </Box>

            <Box my={1}>
              <TextField
                variant="outlined"
                label="Lokacija"
                type="text"
                name="lokacija"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lokacija}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.lokacija && touched.lokacija && errors.lokacija}
              </Typography>
            </Box>

            <Box my={1}>
              <TextField
                variant="outlined"
                label="Cena proizvoda"
                type="number"
                name="cena"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cena}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.cena && touched.cena && errors.cena}
              </Typography>
            </Box>

            <Box my={1}>
              <TextField
                variant="outlined"
                label="Broj telefona"
                type="number"
                name="brojTelefona"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brojTelefona}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.brojTelefona && touched.brojTelefona && errors.brojTelefona}
              </Typography>
            </Box>

            
            <Box my={1}>
            
               <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              label="Novo ili polovno"
              type="text"
              name="novo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.novo}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            >
              <MenuItem value={"Novo"}>Novo</MenuItem>
              <MenuItem value={"Polovno"}>Polovno</MenuItem>
            </Select>
              <Typography variant="body1" color="error">
                {errors.novo && touched.novo && errors.novo}
              </Typography>
            </Box>

            <Box my={1}>
            
            <Select
           // labelId="demo-simple-select-label"
           // id="demo-simple-select"
           label="Kategorija"
           type="string"
           name="kategorija"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.kategorija}
           sx={{
             "& .MuiOutlinedInput-root": {
               "& fieldset": {
                 borderColor: theme.palette.primary.main,
               },
             },
           }}
         >
           <MenuItem value={"Alati"}>Alati</MenuItem>
           <MenuItem value={"Audio"}>Audio</MenuItem>
           <MenuItem value={"Elektronika"}>Elektronika</MenuItem>
           <MenuItem value={"Odeca"}>Odeca</MenuItem>
           <MenuItem value={"Obuca"}>Obuca</MenuItem>
           <MenuItem value={"Knjige"}>Knjige</MenuItem>
           <MenuItem value={"Igre"}>Igre</MenuItem>
           <MenuItem value={"Razno"}>Razno</MenuItem>
         </Select>
           <Typography variant="body1" color="error">
             {errors.kategorija && touched.kategorija && errors.kategorija}
           </Typography>
         </Box>

           

            

            <Button onClick={handleSubmit} type="button" variant="contained">
              Dodaj oglas
            </Button>
          </Box>
        )}
      </Formik>
    </Layout>  )
}

export default DodajOglas