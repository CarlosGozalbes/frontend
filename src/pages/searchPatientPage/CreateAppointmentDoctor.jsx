import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
 
  Divider,
  Grid,
  Typography,
 
  alpha,
  TextField,
  FormControl,
  Avatar,
  CircularProgress,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { insuranceCompanies } from "../../data/data";
import { useNavigate, useParams } from "react-router-dom";

import CalendarDoctor from "./components/CalendarDoctor"; // Adjust the import based on your project structure
import Footer from "../landingPage/components/Footer"; // Adjust the import based on your project structure
import { useUser } from "../../auth/useUser";
import Swal from "sweetalert2";
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
const formatDateTimeRange = (startTime, endTime) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric' };

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(startDate);
  const startFormattedTime = new Intl.DateTimeFormat('es-ES', timeOptions).format(startDate);
  const endFormattedTime = new Intl.DateTimeFormat('es-ES', timeOptions).format(endDate);

  return `${formattedDate} de las ${startFormattedTime} a las ${endFormattedTime}`;
};
function CreateAppointmentDoctor() {
  const { user, loading, error, setUser } = useUser();
  const {id} = useParams();
  const [patientInfo, setPatientInfo] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    insurance: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [loadinga, setLoadinga] = useState(false);
  const handleDescriptionChange = (event) => {
    setFormData({
      ...formData,
      description: event.target.value,
    });
  };
  const [duration, setDuration] = useState(15);
  
  const handleDurationChange = (event) => {
    const value = event.target.value;
    // Ensure the value is an integer
    const intValue = parseInt(value, 10);
    // Only update the state if the value is a number
    if (!isNaN(intValue)) {
      setDuration(intValue);
    } else {
      setDuration(15); // or handle it as you prefer when the value is not a valid number
    }
  };
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      if (user) {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL +`/users/doctor/${user._id}`
          );
          console.log("infodoctor", response.data);
          setDoctorInfo(response.data);
        } catch (error) {
          console.error("Error fetching doctor info:", error);
        }
      }
    };
  const fetchPatientInfo = async () => {
      if (user) {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL +`/users/${id}`
          );
          console.log("infopatient", response.data);
          setPatientInfo(response.data);
        } catch (error) {
          console.error("Error fetching patient info:", error);
        }
      }
    }
    fetchPatientInfo();
    fetchDoctorInfo();
  }, [user, duration]);



  // Render a loading indicator or some placeholder while fetching the user and doctor info
  const handleSubmit = async () => {
    try {
      setLoadinga(true); // Set loading state to true to display a loading indicator
  
      // Make sure startTime and endTime are not empty before submitting
      if (!formData.startTime || !formData.endTime) {
        console.error("Selecciona una fecha.");
        return;
      }
      if (!formData.description) {
        console.error("Completa el campo descripcion.");
        return;
      }
      if (!formData.insurance) {
        console.error("Selecciona compañia de seguros.");
        return;
      }
      const startTime = new Date(formData.startTime);
      const endTime = new Date(formData.endTime);
      startTime.setHours(startTime.getHours() + 2);
      endTime.setHours(endTime.getHours() + 2);
      const updatedFormData = {
        ...formData,
        patient: id, // Assuming user.id contains the patient ID
        doctor: user._id, // Assuming doctorInfo.user_id contains the doctor's user ID
        diagnosis: "", // Set diagnosis to an empty string initially
        startTime: formatDate(startTime), // Format startTime
        endTime: formatDate(endTime), // Format endTime
      };
  
  console.log(updatedFormData);
  
      // Make the POST request to your server endpoint
      // Handle successful response from the server
      const response = await axios.post(import.meta.env.VITE_API_URL +'/appointments', updatedFormData);
  
      console.log('Appointment created successfully:', response.data);
      Swal.fire({
        title: 'Cita creada',
        text: 'La cita ha sido creada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        // Redirect to the home page when the alert is accepted
        navigate("/myAppoinmentsDoctor")
      });
      // Optionally, you can navigate to a different page or show a success message
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error creating appointment:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear la cita. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setLoadinga(false); // Set loading state back to false after the request is complete
    }
  };
  const formatDate = (date) => {
    const formattedDate = date.toISOString(); // Returns date in the format 'YYYY-MM-DDTHH:MM:SS.ZZZZ'
    return formattedDate.slice(0, -5); // Remove the last 4 characters
  };
  return (
   
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Divider />
        <Box style={{ flex: "1" }}>
          <Box
            id="searchbar"
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
                alignItems: "center",
                gap: { xs: 3, sm: 6 },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} order={7}>
                  <Divider />
                  <TextField
                    sx={{ mt: 4 }}
                    id="outlined-controlled"
                    label="Duracion cita en minutos"
                    value={duration}
                    onChange={handleDurationChange}
                    type="number" // Ensures the input field only accepts numeric values
                  />
                  <Typography
                    component="h2"
                    variant="h6"
                    align="left"
                    color="text.primary"
                    marginTop={2}
                  >
                    Calendario de Citas
                  </Typography>
                  {loading || !user || !doctorInfo ? (
                    <div>Loading...</div>
                  ) : (
                    <CalendarDoctor
                      duration={duration}
                      setFormData={setFormData}
                      doctor={doctorInfo}
                    />
                  )}
                </Grid>
                <Grid container>
                  <Grid
                    /* style={{ backgroundColor: "rgba(247,247,247,0.7)" }} */
                    padding={4}
                    borderRadius={5}
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    order={{ xs: 3, md: 2 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt="Avatar doctor"
                        src={`${patientInfo?.avatar}`}
                        sx={{ width: 150, height: 150, mb: 3 }}
                      />
                    </div>

                    <Typography
                      component="h2"
                      variant="h6"
                      align="center"
                      color="text.primary"
                    >
                      {patientInfo?.name} {patientInfo?.surname}
                    </Typography>
                    <Typography
                      component="h2"
                      variant="body2"
                      align="center"
                      color="text.primary"
                      marginBottom={2}
                    >
                      {patientInfo?.specialization}
                    </Typography>
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <PhoneAndroidIcon color="primary" />{" "}
                      <Typography
                        variant="body2"
                        sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                        color="text.secondary"
                      >
                        {patientInfo?.phoneNumber}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <EmailIcon color="primary" />{" "}
                      <Typography
                        variant="body2"
                        sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                        color="text.secondary"
                      >
                        {patientInfo?.email}{" "}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <LocationOnIcon color="primary" />{" "}
                      <Typography
                        variant="body2"
                        sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                        color="text.secondary"
                      >
                        {patientInfo?.address.description}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    /*  style={{ backgroundColor: "rgba(247,247,247,0.7)" }} */
                    padding={4}
                    borderRadius={5}
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    order={{ xs: 3, md: 2 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        align="center"
                        color="text.primary"
                      >
                        Fecha y hora de la cita
                      </Typography>{" "}
                    </div>
                    <Typography
                      component="h2"
                      variant="body2"
                      align="left"
                      color="text.primary"
                      marginBottom={2}
                    >
                     {formData.startTime && formData.endTime 
                        ? formatDateTimeRange(formData.startTime, formData.endTime)
                        : "Seleccione una fecha y hora en el calendario"}
                    </Typography>

                    <Divider />
                    <Typography
                      component="h2"
                      variant="body2"
                      align="left"
                      color="text.primary"
                      marginTop={4}
                    >
                      Añada el motivo de su visita
                    </Typography>
                    <Textarea
                      width={"100%"}
                      aria-label="minimum height"
                      minRows={4}
                      value={formData.description}
                      onChange={handleDescriptionChange}
                      placeholder="Escriba aqui el motivo de su visita"
                      margin="normal"
                    />
                    <Typography
                      component="h2"
                      variant="body2"
                      align="left"
                      color="text.primary"
                      marginTop={1}
                      marginBottom={2}
                    >
                      Elije tu seguro
                    </Typography>
                    <FormControl fullWidth>
                      <Autocomplete
                        id="combo-box-insurance"
                        sx={{ mb: 3 }}
                        options={insuranceCompanies}
                        value={formData.insurance}
                        onChange={(event, newValue) =>
                          setFormData({ ...formData, insurance: newValue })
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Seguro" />
                        )}
                      />
                    </FormControl>
                    <Button
                      color="primary"
                      variant="outlined"
                      size="large"
                      onClick={handleSubmit}
                    >
                      {loadinga ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Confirmar cita"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Divider />
        <Footer />
      </Box>
   
  );
}

export default CreateAppointmentDoctor;
