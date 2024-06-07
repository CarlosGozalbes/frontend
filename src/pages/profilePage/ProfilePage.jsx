import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "../../components/AppAppBar";
import { Box, Divider } from "@mui/material";
import Footer from "../landingPage/components/Footer";
import { useState } from "react";
import ProfileInfo from "./components/ProfileInfo";



function ProfilePage() {
  const [mode, setMode] = useState("light");

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
        <Box style={{ flex: "1"}}>
         <ProfileInfo />
        </Box>
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default ProfilePage;
