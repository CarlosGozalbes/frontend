import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline, Divider, createTheme } from '@mui/material';
import React from 'react'
import AppAppBar from '../../components/AppAppBar';
import Footer from '../landingPage/components/Footer';
import InfoDoctor from './components/InfoDoctor';

function DoctorPage() {
    const [mode, setMode] = React.useState("light");
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Box
          style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >

          <Divider />
          <Box style={{ flex: "1" }}>
                     <InfoDoctor />
          </Box>
          <Divider />
          <Footer />
        </Box>
      </ThemeProvider>
    );
}

export default DoctorPage