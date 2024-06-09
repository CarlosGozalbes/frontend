
import { Box, Divider } from "@mui/material";
import moment from "moment";

import { useParams } from "react-router-dom";

import Footer from "../landingPage/components/Footer";
import InfoAppoinment from "./components/InfoAppoinment";


function CreateAppointment() {

  const { start, end,id } = useParams();
  
  const format = "YYYY-MM-DD-hh:mm-A";
  const startDate = moment(start, format);
  const endDate = moment(end, format);
 
  return (
    
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
    
  );
}

export default CreateAppointment;
