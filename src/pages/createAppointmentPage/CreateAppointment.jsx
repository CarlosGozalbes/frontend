import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Divider, createTheme } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppAppBar from "../../components/AppAppBar";
import Footer from "../landingPage/components/Footer";
import InfoAppoinment from "./components/InfoAppoinment";
import axios from "axios";

function CreateAppointment() {
  const [mode, setMode] = useState("light");
  const { start, end,id } = useParams();
  
  const format = "YYYY-MM-DD-hh:mm-A";
  const startDate = moment(start, format);
  const endDate = moment(end, format);
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
        <InfoAppoinment startDate={startDate} endDate={endDate}  date={startDate.format("DD-MM-YYYY")} startTime={startDate.format("hh:mm A")} endTime={endDate.format("hh:mm A")}/>
        </Box>
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default CreateAppointment;
