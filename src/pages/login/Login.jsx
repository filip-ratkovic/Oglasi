import React, { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../shema/loginShema";

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
            <Typography variant="h3" color="primary" gutterBottom mb={5}>
              Log in
            </Typography>
            <Box my={1}>
              <TextField
                variant="standard"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                style={{ width: "400px" }}
                sx={{
                  "& label": {
                    color: "grey",
                  },

                  // "& .MuiFormLabel-root.Mui-focused": {
                  //     color: 'blue'
                  // },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.email && touched.email && `* ${errors.email}`}
              </Typography>
            </Box>
            <Box my={1}>
              <FormControl variant="standard">
                <InputLabel
                  htmlFor="standard-adornment-password"
                  sx={{ color: "grey" }}
                >
                  Password
                </InputLabel>
                <Input
                  style={{ width: "400px" }}
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
                  Forgot password ?
                </Typography>
              )}
            </Box>
            <Box
              mt={5}
              sx={{
                display: "flex",
                justifyContent: "space-between",
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
                Log in
              </Button>

              <Button
                onClick={signInWithGoogleHandler}
                type="button"
                variant="contained"
                style={{
                  width: "50%",
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.background,
                }}
              >
                Log in with Google
              </Button>
            </Box>
            { error && <Typography
              style={{ color: theme.palette.error.main, marginTop:'10px'}}
            >
              Wrong email or password!
            </Typography>}
            <Link
              to={"/signup"}
              className="link"
              style={{ color: theme.palette.text.secondary }}
            >
              Don't have an account? <span>Sign up</span>
            </Link>
          </Container>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
