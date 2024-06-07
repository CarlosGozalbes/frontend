import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, Grid, Tooltip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/system";
import Swal from "sweetalert2";
function AppointmentCard({ appointment, future, setAppointments }) {
  const theme = useTheme();
  const handleCancelAppointment = async () => {
    try {
      const confirmed = await showConfirmationDialog();
      if (confirmed) {
        const response = await fetch(
          import.meta.env.VITE_API_URL +`/appointments/${appointment._id}`,
          {
            method: "DELETE",
          }
        );
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

  return (
    <Box
      style={{
        width: "100%",
        
        backgroundImage:
          theme.palette.mode === "light"
            ? "url(https://orhanergun.net/assets/frontend/default/new/images/bg/bg-image-10.jpg)"
            : "url(https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg)",
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
              src={appointment.doctor.avatar}
              sx={{ width: 100, height: 100 }}
            />{" "}
          </div>
          <Typography
            component="h2"
            variant="h6"
            sx={{ marginTop: "2px",fontSize: "1rem", fontWeight: "bold"}}
            align="center"
            color="text.primary"
          >
            
            {(appointment.doctor.name.length + appointment.doctor.surname.length) > 15 ? (
  <Tooltip title={appointment.doctor.name + " " + appointment.doctor.surname}>
    <span>
      {`${appointment.doctor.name} ${appointment.doctor.surname}`.substring(0, 15)}...
    </span>
  </Tooltip>
) : (
  `${appointment.doctor.name} ${appointment.doctor.surname}`
)}
          </Typography>
          <Typography
            component="h5"
            variant="body2"
            align="center"
            color="text.primary"
            sx={{mb:1}}
          >
            {appointment.doctor.infoDoctor.specialization}
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
              {appointment.doctor.phoneNumber}
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
              {appointment.doctor.email.length > 15 ? (
                <Tooltip title={appointment.doctor.email}>
                  <span>{appointment.doctor.email.substring(0, 15)}...</span>
                </Tooltip>
              ) : (
                appointment.doctor.email
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
              {appointment.doctor.address.description.length > 15 ? (
                <Tooltip title={appointment.doctor.address.description}>
                  <span>
                    {appointment.doctor.address.description.substring(0, 15)}...
                  </span>
                </Tooltip>
              ) : (
                appointment.doctor.address.description
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
              <Typography
                component="p"
                variant="body2"
                align="left"
                color="text.primary"
              >
                {appointment.diagnostic
                  ? appointment.diagnostic
                  : "No hay diagnostico"}
              </Typography>
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
                  {appointment.startTime.split("T")[0]} a las{" "}
                  {appointment.startTime.split("T")[1].split(".")[0]}
                </Typography>
              </div>
              {future && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ minWidth: "fit-content" }}
                  startIcon={<DeleteIcon />}
                  onClick={handleCancelAppointment}
                >
                  Cancelar
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
