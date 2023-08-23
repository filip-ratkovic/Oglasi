import React, { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../shema/loginShema";
import GoogleIcon from "@mui/icons-material/Google";
import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Container,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { login, resetPassword, signInWithGoogle } from "../../config/firebase";
import Layout from "../../containers/Layout";
import "./login.css"



const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] =useState(false)

  const navigate = useNavigate();
  const theme = useTheme();


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  
  const signInWithGoogleHandler = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const submitLogin = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      setForgotPassword(true);
      setError(true)
    }
  };

  const forgotPasswordHandler = async (data) => {
    try {
      await resetPassword(data);
      alert(`We sent a password reset email on ${data}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          submitLogin(values);
        }}
        style={{ backgroundColor: theme.palette.primary.main, }}
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
              color:theme.palette.text.primary,
              marginBlock:"50px"
            }}
          >
            <Typography variant="h3" gutterBottom mb={5}>
              Uloguj se
            </Typography>
            <Box my={1} className="login-box">
              <TextField
                variant="standard"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="login-input"
                sx={{
                  "& label": {
                    color: "grey",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                      color: 'grey'
                  },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.email && touched.email && `* ${errors.email}`}
              </Typography>
            </Box>
            <Box my={1} className="login-box">
              <FormControl variant="standard" className="login-input" sx={{  "& label": {
                    color: "grey",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                      color: 'grey'
                  },}}>
                <InputLabel
                  htmlFor="standard-adornment-password"
                  sx={{ color: "grey"}}
                >
                  Šifra
                </InputLabel>
                <Input
                  className="login-input"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    "& label": {
                      color: "grey",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: 'grey'
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

              {forgotPassword && (
                <Typography
                  style={{  color: theme.palette.error.main, cursor: "pointer" }}
                  onClick={() => forgotPasswordHandler(values.email)}
                >
                  Zaboravio si šifru?
                </Typography>
              )}
            </Box>
            <Box
              mt={5}
              sx={{
                display: "flex",
                width: "410px",
                maxWidth:"100%",
                flexDirection:"column"
              }}
            >
              <Button
                onClick={handleSubmit}
                type="button"
                variant="contained"
                style={{ width: "100%", marginBottom: "15px"}}
              >
                Uloguj se
              </Button>

              <Button
                onClick={signInWithGoogleHandler}
                type="button"
                variant="contained"
                style={{
                  width: "100%",
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.background,
                }}
              >
                <GoogleIcon/>
              Uloguj se sa Google nalogom
              </Button>
            </Box>
            { error && <Typography
              style={{ color: theme.palette.error.main, marginTop:'10px'}}
            >
              Pogrešan email ili šifra!
            </Typography>}
            <Link
              to={"/registracija"}
              className="link"
              style={{ color: theme.palette.text.secondary }}
            >
              Nemas nalog? <span>Registruj se</span>
            </Link>
          </Container>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
