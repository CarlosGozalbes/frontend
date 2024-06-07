import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, Grid, Tooltip, styled } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/system";
import Swal from "sweetalert2";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";
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
function AppointmentCard({diagnosisPending,appointment,future,setAppointments}) {
    const theme = useTheme()
    const [diagnosis, setDiagnosis] = useState(appointment.diagnosis);
    const handleCancelAppointment = async () => {
      try {
        const confirmed = await showConfirmationDialog();
        if (confirmed) {
          const response = await fetch(import.meta.env.VITE_API_URL +`/appointments/${appointment._id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            // Appointment deleted successfully, update UI or state accordingly
            console.log("Appointment canceled successfully");
            // Remove the canceled appointment from the state
            setAppointments((prevAppointments) =>
              prevAppointments.filter((apt) => apt._id !== appointment._id)
            );
          } else {
            // Handle error response
            console.error("Failed to cancel appointment");
          }
        }
      } catch (error) {
        console.error("Error canceling appointment:", error);
      }
    };
  
    const showConfirmationDialog = async () => {
      const result = await Swal.fire({
        title: "Estas seguro?",
        text: "Deseas cancelar esta cita?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "No, volver",
        confirmButtonText: "Si, cancelar",
      });
      return result.isConfirmed;
    };
    const handleEditAppointment = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL +`/appointments/${appointment._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ diagnosis: diagnosis }),
        });
    
        if (response.ok) {
          const updatedAppointment = await response.json();
          // Update the appointments state with the new diagnosis
          setAppointments((prevAppointments) =>
            prevAppointments.map((apt) =>
              apt._id === appointment._id ? { ...apt, diagnosis: updatedAppointment.diagnosis } : apt
            )
          );
          Swal.fire({
            title: "Exito",
            text: "Diagnostico actualizado correctamente",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Failed to update appointment");
          Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el diagnostico",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error updating appointment:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el diagnostico",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    
  return (
    <Box
      style={{
        width: "100%",
        backgroundImage: theme.palette.mode === "light"?
          "url(https://orhanergun.net/assets/frontend/default/new/images/bg/bg-image-10.jpg)": "url(https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "5px 5px 5px 0px rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "10px",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      {" "}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={appointment.patient.avatar}
              sx={{ width: 100, height: 100 }}
            />{" "}
          </div>
          <Typography
            component="h2"
            variant="h6"
            align="center"
            color="text.primary"
          >
            {appointment.patient.name} {appointment.patient.surname}
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
               {appointment.patient.phoneNumber}
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
              {appointment.patient?.email?.length > 15 ? (
                <Tooltip title={appointment.patient.email}>
                  <span>{appointment.patient.email.substring(0, 15)}...</span>
                </Tooltip>
              ) : (
                appointment.patient.email
              )}
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
              {appointment.patient?.address?.description?.length > 15 ? (
                <Tooltip title={appointment.patient.address.description}>
                  <span>
                    {appointment.patient.address.description.substring(0, 15)}...
                  </span>
                </Tooltip>
              ) : (
                appointment.patient?.address?.description
              )}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            <div style={{ flex: "1" }}>
              <Typography
                component="h6"
                variant="h6"
                align="left"
                color="text.primary"
              >
                Descripcion Cita
              </Typography>
              <Typography
                component="p"
                variant="body2"
                align="left"
                color="text.primary"
              >
                {appointment.description}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                align="left"
                color="text.primary"
              >
                Diagnostico
              </Typography>
             {diagnosisPending ? (
              <Textarea
              width={"100%"}
              aria-label="minimum height"
              minRows={4}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Escriba aqui el diagnostico del paciente"
              margin="normal"
            />
             ) : (
              <Typography
                component="p"
                variant="body2"
                align="left"
                color="text.primary"
              >
               
                {appointment.diagnosis ? appointment.diagnosis : "No hay diagnostico"}
              </Typography>
             )} 
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CalendarMonthIcon color="primary" />{" "}
                <Typography
                  variant="body2"
                  sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                  color="text.secondary"
                >
                 {appointment.startTime.split("T")[0]} a las {appointment.startTime.split("T")[1].split(".")[0]} 
                </Typography>
              </div>
              {future && (          <Button
            variant="outlined"
            color="error"
            sx={{ minWidth: "fit-content" }}
            startIcon={<DeleteIcon />}
            onClick={handleCancelAppointment}
          >
            Cancelar
          </Button>
)}
               {diagnosisPending && (          <Button
            variant="outlined"
            color="success"
            sx={{ minWidth: "fit-content" }}
            startIcon={<BorderColorIcon />}
            onClick={handleEditAppointment}
          >
            Editar
          </Button>
)}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AppointmentCard;
