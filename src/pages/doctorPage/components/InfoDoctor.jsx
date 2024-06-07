import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  alpha,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarDoctor from "./CalendarDoctor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../auth/useUser";
import CommentSection from "./CommentSection";
import DoctorRating from "./DoctorRating";
import UserRatingDoctor from "./UserRatingDoctor";
function InfoDoctor() {
  const { user } = useUser();
  const { id } = useParams(); // Extract the id parameter from the URL
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL +`/users/doctor/${id}`
        );
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
          <Grid item xs={12} sm={12} md={12} order={{ md: 1, lg: 1 }}>
            <div style={{display:"flex", alignItems:"center",gap:"1rem"}}>
              <Typography
                component="h2"
                variant="h4"
                align="left"
                color="text.primary"
              >
                {doctorInfo?.name} {doctorInfo?.surname}
              </Typography>
              <DoctorRating doctorId={id}/>
            </div>
            <Typography
              component="h5"
              variant="h6"
              align="left"
              color="text.primary"
            >
              {doctorInfo?.infoDoctor?.specialization}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                margin: "20px 0px",
              }}
            >
              <CalendarMonthIcon />
              <Typography
                variant="a"
                sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                color=""
              >
                Solicite una consulta
              </Typography>
            </div>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={8} md={6} order={{ xs: 3, md: 2 }}>
            <Typography
              component="h2"
              variant="h6"
              align="left"
              color="text.primary"
              marginTop={2}
            >
              Descripcion general
            </Typography>

            <Typography
              component="h2"
              variant="body2"
              align="left"
              color="text.primary"
            >
              {doctorInfo?.infoDoctor?.description}
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              align="left"
              color="text.primary"
              marginTop={2}
            >
              Centro
            </Typography>

            <Typography
              component="h2"
              variant="body2"
              align="left"
              color="text.primary"
            >
              {doctorInfo?.address.center}
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              align="left"
              color="text.primary"
              marginTop={2}
            >
              Ciudad
            </Typography>

            <Typography
              component="h2"
              variant="body2"
              align="left"
              color="text.primary"
            >
              {doctorInfo?.address.city}
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              align="left"
              color="text.primary"
              marginTop={2}
            >
              Aseguradoras
            </Typography>

            <Typography
              component="h2"
              variant="body2"
              align="left"
              color="text.primary"
            >
              {doctorInfo?.infoDoctor?.insuranceCompanies?.join(", ")}
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              align="left"
              color="text.primary"
              marginTop={2}
            >
              Horario
            </Typography>

            <Grid container spacing={2}>
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(
                (day) => (
                  <Grid item xs={4} sm={4} md={2.3} key={day}>
                    <Typography
                      component="h2"
                      variant="body2"
                      align="left"
                      color="text.primary"
                    >
                      {day}
                    </Typography>
                    {doctorInfo?.infoDoctor?.schedule[day] ? (
                      <>
                        <Typography
                          component="h2"
                          variant="body2"
                          align="left"
                          color="text.primary"
                        >
                          {doctorInfo?.infoDoctor?.schedule[day].morning?.start}{" "}
                          - {""}
                          {doctorInfo?.infoDoctor?.schedule[day].morning?.end}
                        </Typography>
                        <Typography
                          component="h2"
                          variant="body2"
                          align="left"
                          color="text.primary"
                        >
                          {doctorInfo?.infoDoctor?.schedule[day].evening?.start}{" "}
                          - {""}
                          {doctorInfo?.infoDoctor?.schedule[day].evening?.end}
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        component="h2"
                        variant="body2"
                        align="left"
                        color="text.primary"
                      >
                        No hay horario disponible
                      </Typography>
                    )}
                  </Grid>
                )
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8} md={6} order={{ xs: 2, md: 3 }}>
            <img
              width={"100%"}
              style={{ objectFit: "cover" }}
              src={doctorInfo?.avatar}
              alt=""
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} order={4}>
            <Divider />
            <Typography
              component="h2"
              variant="h6"
              align="left"
              color="text.primary"
              marginTop={2}
            >
              Contacto
            </Typography>
          </Grid>

          <Grid item xs={12} sm={7} md={7} order={5}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2672.7857865990864!2d-3.6128513843023193!3d37.18844984696835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fcfabbb58a67%3A0xd31b2418966c4326!2sHospital%20Universitario%20Virgen%20de%20las%20Nieves!5e0!3m2!1ses!2scz!4v1715775464482!5m2!1ses!2scz"
              width="100%"
              height="250"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Grid>
          <Grid item xs={12} sm={5} md={5} order={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <PhoneAndroidIcon />{" "}
              <Typography
                variant="body2"
                sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                color="text.secondary"
              >
                <a
                  href={`tel:${doctorInfo?.phoneNumber}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {doctorInfo?.phoneNumber}
                </a>
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <EmailIcon />{" "}
              <Typography
                variant="body2"
                sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                color="text.secondary"
              >
                <a
                  href={`mailto:${doctorInfo?.email}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {doctorInfo?.email}
                </a>
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <LocationOnIcon />{" "}
              <Typography
                variant="body2"
                sx={{ paddingTop: "3px", paddingLeft: "5px" }}
                color="text.secondary"
              >
                {doctorInfo?.address.description}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} order={7}>
            <Divider />
            {!user ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  align="left"
                  color="text.primary"
                  marginTop={2}
                >
                  Inicia sesion para reservar una cita
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  align="left"
                  color="text.primary"
                  marginTop={2}
                >
                  Calendario de Citas
                </Typography>
                <CalendarDoctor doctor={doctorInfo} />
              </>
            )}
            <Divider sx={{ mt: 3, mb: 3 }} />
            {!user ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  align="left"
                  color="text.primary"
                  marginTop={2}
                >
                  Inicia sesion para Valorar al doctor
                </Typography>
              </>
            ) : (
              <>
                
                <UserRatingDoctor doctorId={id} />
              </>
            )}
            <Divider sx={{ mt: 3, mb: 3 }} />
            {!user ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  align="left"
                  color="text.primary"
                  marginTop={2}
                >
                  Inicia sesion para comentar
                </Typography>
              </>
            ) : (
              <>
                
                <CommentSection doctorId={id} />
              </>
            )}
            
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default InfoDoctor;
