
import { Box, Divider } from "@mui/material";
import Footer from "../landingPage/components/Footer";


import AppointmentsTabs from "./components/AppointmentsTabs";

function PatientDatesPage() {
 
  return (
    
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Divider />
        <Box style={{ flex: "1"}}>
         <AppointmentsTabs/>
        </Box>
        <Divider />
        <Footer />
      </Box>
    
  );
}

export default PatientDatesPage;