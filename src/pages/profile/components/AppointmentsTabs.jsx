import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Typography, alpha } from "@mui/material";
import { Container } from "@mui/system";
import AppointmentCard from "./AppointmentCard";
import { useToken } from "../../../auth/useToken";
import { useParams } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AppointmentsTabs() {
  const [token, setToken] = useToken();
  const [value, setValue] = React.useState(0);
  const [appointments, setAppointments] = React.useState([]);

  React.useEffect(() => {
    console.log(token);
    // Fetch appointments from your backend API
    // You can replace this with your actual API call
    const fetchAppointments = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL +"/appointments/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setAppointments(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const pastAppointments = appointments?.filter(
    (appointment) => new Date(appointment.startTime) < new Date()
  );
  const futureAppointments = appointments?.filter(
    (appointment) => new Date(appointment.startTime) > new Date()
  );
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        pt: { xs: 12, sm: 12 },
        pb: { xs: 4, sm: 6 },
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.1)})`,
        backgroundSize: "100% 40%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Citas pasadas" {...a11yProps(0)} />
           
            <Tab label="Citas Futuras" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} gap={5}>
          <Grid container spacing={2}>
          {pastAppointments.length > 0 ? (
  pastAppointments.map((appointment) => (
    <Grid item xs={12} sm={12} md={6} key={appointment.id}>
      <AppointmentCard appointment={appointment} />
    </Grid>
  ))
) : (
  <Typography variant="body1" sx={{ml:3}}>No hay citas</Typography>
)}
          </Grid>
        </CustomTabPanel>
      
        <CustomTabPanel value={value} index={1}>
          <Grid container spacing={2}>
          {futureAppointments.length > 0 ? (
  futureAppointments.map((appointment) => (
    <Grid item xs={12} sm={12} md={6} key={appointment.id}>
      <AppointmentCard
        appointment={appointment}
        future={true}
        setAppointments={setAppointments}
      />
    </Grid>
  ))
) : (
  <Typography variant="body1" sx={{ml:3}}>
    No hay citas
  </Typography>
)}  
          </Grid>
        </CustomTabPanel>
      </Container>
    </Box>
  );
}
