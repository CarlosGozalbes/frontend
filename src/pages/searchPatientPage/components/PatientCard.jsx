import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  alpha,
} from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
function PatientCard({ patient}) {
  
  
  return (
    <Grid   item xs={12} sm={6} md={3}>
      <Card 
        sx={(theme) => ({
          backgroundImage:
            theme.palette.mode === "light"
              ? "radial-gradient(1224px at 10.6% 8.8%, rgb(255, 255, 255) 0%, rgb(153, 202, 251) 100.2%)"
              : `linear-gradient(#02294F, ${alpha("#090E10", 0.1)})`,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        })}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          sx={{ objectFit: "cover" }}
          image={patient.avatar}
        />
        <CardContent sx={{ flex: "1 0 auto", display:"flex",flexDirection:"column" }}>
          <div>
          <Typography gutterBottom variant="h5" component="div">
            {patient.name} {patient.surname}
          </Typography>
         </div>
          <div style={{flexGrow:1}}></div>
          
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <PhoneAndroidIcon />{" "}
            <Typography
              variant="body2"
              sx={{ paddingTop: "3px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              {patient.phoneNumber}
            </Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <EmailIcon />{" "}
            <Typography
              variant="body2"
              sx={{ paddingTop: "3px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              {patient.email}
            </Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <LocationOnIcon />{" "}
            <Typography
              variant="body2"
              sx={{ paddingTop: "3px", paddingLeft: "5px" }}
              color="text.secondary"
            >
              {patient.address.description}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Link to={`/doctorCreateAppointment/${patient._id}`}>
            <Button size="small">Asignar Cita</Button>
          </Link>
          <Link to={`/patient/${patient._id}`}>
            {" "}
            <Button size="small">Ver citas</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default PatientCard;
