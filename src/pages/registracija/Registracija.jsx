import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";

import Layout from "../../containers/Layout";
import { datum } from "../../shema/datum";
import { addUsers, signInWithGoogle, signUp } from "../../config/firebase";
import {RegistracijaShema} from "../../shema/RegistracijaShema"

import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff, Google as GoogleIcon } from "@mui/icons-material";
import "./registracija.css";

const Registracija = () => {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const signUpSubmit = async (values) => {
    try {
      const res = await signUp(values.email, values.password, values.username);
      await addUsers({
        ...values,
        userID: res.uid,
        email: res.email,
        password: "",
        confirm_password: "",
        ocene: [],
        pozitivna_ocena: [],
        negativna_ocena: [],
        follow: [],
      });
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirm_password: "",
          username: "",
          ime_prezime: "",
          grad: "",
          broj_telefona: "",
          datum_prijave: datum(),
        }}
        validationSchema={RegistracijaShema}
        onSubmit={(values, actions) => {
          signUpSubmit(values);
        }}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              color: theme.palette.text.primary,
              marginTop: "50px",
            }}
          >
            <Typography variant="h3" gutterBottom mb={5}>
              Registruj se
            </Typography>
            <Box my={1} className="reg-box-style">
              <TextField
                variant="standard"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="reg-input-style"
                sx={{
                  "& label": {
                    color: "grey",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "grey",
                  },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.email && touched.email && `* ${errors.email}`}
              </Typography>
            </Box>
            <Box my={1} className="reg-box-style">
              <FormControl variant="standard" className="reg-input-style">
                <InputLabel
                  sx={{
                    color: "grey",
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "grey",
                    },
                  }}
                >
                  Šifra
                </InputLabel>
                <Input
                  className="reg-input-style"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  sx={{
                    "& label": {
                      color: "grey",
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{ color: "grey" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Typography variant="body2" color="error">
                {errors.password && touched.password && `* ${errors.password}`}
              </Typography>
            </Box>

            <Box my={1} className="reg-box-style">
              <FormControl variant="standard" className="reg-input-style">
                <InputLabel
                  htmlFor="standard-adornment-password"
                  sx={{ color: "grey" }}
                >
                  Potvrdi Šifra
                </InputLabel>
                <Input
                  className="reg-input-style"
                  label="Confirm password"
                  name="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    "& label": {
                      color: "grey",
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{ color: "grey" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Typography variant="body2" color="error">
                {errors.confirm_password &&
                  touched.confirm_password &&
                  `* ${errors.confirm_password}`}
              </Typography>
            </Box>

            <Box my={1} className="reg-box-style">
              <TextField
                variant="standard"
                label="Username"
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className="reg-input-style"
                sx={{
                  "& label": {
                    color: "grey",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "grey",
                  },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.username && touched.username && `* ${errors.username}`}
              </Typography>
            </Box>

            <Box my={1} className="reg-box-style">
              <TextField
                variant="standard"
                label="Ime i Prezime"
                type="text"
                name="ime_prezime"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ime_prezime}
                className="reg-input-style"
                sx={{
                  "& label": {
                    color: "grey",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "grey",
                  },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.ime_prezime &&
                  touched.ime_prezime &&
                  `* ${errors.ime_prezime}`}
              </Typography>
            </Box>

            <Box my={1} className="reg-box-style">
              <TextField
                variant="standard"
                label="Grad"
                type="text"
                name="grad"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.grad}
                className="reg-input-style"
                sx={{
                  "& label": {
                    color: "grey",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "grey",
                  },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.grad && touched.grad && `* ${errors.grad}`}
              </Typography>
            </Box>

            <Box my={1} className="reg-box-style">
              <TextField
                variant="standard"
                label="Broj telefona (+381/661234567)"
                type="text"
                name="broj_telefona"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.broj_telefona}
                className="reg-input-style"
                sx={{
                  "& label": {
                    color: "grey",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "grey",
                  },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.broj_telefona &&
                  touched.broj_telefona &&
                  `* ${errors.broj_telefona}`}
              </Typography>
            </Box>

            <Box
              mt={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "410px",
                maxWidth: "90%",
              }}
            >
              <Button
                onClick={handleSubmit}
                type="button"
                variant="contained"
                className="reg-btn"
              >
                Registruj se
              </Button>

              <Button
                onClick={signInWithGoogleHandler}
                type="button"
                variant="contained"
                className="reg-btn"
                style={{
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.background,
                }}
              >
                <GoogleIcon style={{ marginRight: "5px" }} />
                Registruj se sa Google nalogom
              </Button>
            </Box>
            <Link
              to={"/login"}
              className="link"
              style={{
                color: theme.palette.text.secondary,
                marginBottom: "15px",
              }}
            >
              Već ste registrovani? <span>Uloguj se</span>
            </Link>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default Registracija;
