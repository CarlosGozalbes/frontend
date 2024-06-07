import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink  } from "react-router-dom";

import SignUpStep1 from "./components/SignUpStep1";
import SignUpStep2 from "./components/SignUpStep2";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <RouterLink to="/" style={{ textDecoration: "none" }}>
      MediMatch{" "}
      </RouterLink>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUpPage() {
  
 
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: {
      city: "",
      description: "",
      iframeSrc: "",
      center:"",
    },
    avatar: "",
    role: "User",
    infoDoctor: {
      description: "",
      specialization: "",
      diploma: "",
      insuranceCompanies: [],
      schedule: {
        Lunes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Martes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Miércoles: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Jueves: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Viernes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
      },
    },
  });

 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          {step === 1 && (
        <SignUpStep1 setStep={setStep} formData={formData} setFormData={setFormData} />
      )}
      {step === 2 && (
        <SignUpStep2 setStep={setStep}   formData={formData} setFormData={setFormData} />
     
      )}
         
           
            <Grid container justifyContent="center">
              <Grid item>
                <RouterLink to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="body2">
                    Ya tienes una cuenta? Inicia sesión
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
      
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
