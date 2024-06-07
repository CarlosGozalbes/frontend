import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ListAltIcon from '@mui/icons-material/ListAlt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <EventNoteIcon />,
    title: "Reserva citas facilmente",
    description:
      "Los pacientes pueden programar y cancelar citas desde la aplicación, seleccionando la fecha y hora que mejor les convenga.",     
  },
  {
    icon: <MedicalInformationIcon />,
    title: "Conoce a tu médico",
    description:
      "Los pacientes pueden ver perfiles detallados de los doctores, incluyendo su especialización, experiencia, calificaciones y comentarios de otros pacientes.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Gran experiencia de usuario",
    description:
      "Integra nuestro producto a tu rutina con una fácil e intuitiva interfaz.",
  },
  {
    icon: <ListAltIcon />,
    title: "Registro de Historial Médico",
    description:
      "Acceda a su historial médico, revise recetas anteriores, resultados de pruebas y mantenga un registro de sus visitas médicas.",
  },
  {
    icon: <FavoriteIcon />,
    title: "Consejos de Salud",
    description:
      "Suscribete a nuestra newsletter para recibir regularmente consejos de salud y actualizaciones sobre la aplicación.",
  },
  {
    icon: <MarkEmailUnreadIcon />,
    title: "Recordatorios de Citas",
    description:
      "Recibe notificaciones y recordatorios de tus próximas citas para que nunca las olvides.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
      }}
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
        <Box
          sx={{
            width: { sm: "100%", md: "70%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography textAlign="center" component="h2" variant="h4">
            Prestaciones
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Descubre las características que hacen de nuestra app una solución
            única.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
