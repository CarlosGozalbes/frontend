import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,

  TextField,
 
  Typography,
  alpha,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { insuranceCompanies } from "../../../data/data";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../../auth/useUser";
import moment from "moment";
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
function InfoAppoinment({ date, startTime, endTime,endDate,startDate }) {
  const { user, loading, error,setUser } = useUser();
 const { start, end,id } = useParams();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    insurance: "",
  });
  const navigate = useNavigate();
const [loadinga, setLoadinga] = useState(false)
  const handleDescriptionChange = (event) => {
    setFormData({
      ...formData,
      description: event.target.value,
    });
  };
  const handleSubmit = async () => {
    // Validate description
    if (!formData.description) {
      alert("Please fill in the description.");
      return;
    }
    
    const appointmentData = {
      doctor: id, // Doctor ID from URL parameters
      patient: user._id, // Logged user's ID
      startTime: start, // Combine date and time for start time
      endTime: end, // Combine date and time for end time
      description: formData.description,
      diagnosis: "", // Optional, you can include diagnosis logic if needed
      insurance: formData.insurance,
    };

    setLoadinga(true);

    try {
      // Post appointment data to the backend
      const response = await axios.post(import.meta.env.VITE_API_URL +"/appointments", appointmentData);
      console.log("Appointment created:", response.data);

      // Show success alert
      Swal.fire({
        title: "Cita confirmada",
        text: `Su cita para el ${date} de las ${startTime} a las ${endTime} ha sido confirmada.`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle error, e.g., show error message
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear la cita. Por favor, inténtelo de nuevo.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoadinga(false);
    }
  };

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL +`/users/${id}`);
        console.log(response.data);
        setDoctorInfo(response.data);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchDoctorInfo();
  }, [id]);
 
  return (
    <Box
      id="searchbar"
      sx={(theme) => ({
        pt: { xs: 18, sm: 18 },
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
                src={`${doctorInfo?.avatar}`}
                sx={{ width: 150, height: 150,mb:3 }}
              />
            </div>

            <Typography
              component="h2"
              variant="h6"
              align="center"
              color="text.primary"
            >
              {doctorInfo?.name} {doctorInfo?.surname}
            </Typography>
            <Typography
              component="h2"
              variant="body2"
              align="center"
              color="text.primary"
              marginBottom={2}
            >
              {doctorInfo?.specialization}
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
                {doctorInfo?.phoneNumber}
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
  {doctorInfo?.email}              </Typography>
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
                  {doctorInfo?.address.description}
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
              El día {date} de las {startTime} a las {endTime}
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
            <FormControl fullWidth >
            
               <Autocomplete
            id="combo-box-insurance"
            sx={{mb:3}}
            options={insuranceCompanies}
            value={formData.insurance}
            onChange={(event, newValue) => setFormData({ ...formData, insurance: newValue })}
            renderInput={(params) => <TextField {...params} label="Seguro" />}
          />
            </FormControl>
            <Button
              color="primary"
              variant="outlined"
              size="large"
              onClick={handleSubmit}
            >
                {loadinga ? <CircularProgress size={24} /> : 'Confirmar cita'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default InfoAppoinment;
