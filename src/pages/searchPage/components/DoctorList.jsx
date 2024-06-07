import { Box, Container, Grid, Typography } from "@mui/material";
import DoctorCard from "./DoctorCard";
export default function DoctorList({ doctors, filteredDoctors, error }) {
  return (
    <Box
      id="doctors"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 4, sm: 6 },
        width: "100%",
        backgroundSize: "100% 40%",
        backgroundRepeat: "no-repeat",
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
        <Grid container spacing={2}>
        {filteredDoctors.length === 0 ? (
              <Typography variant="h6" sx={{ml:3}} align="center" color="textSecondary">No hay resultados.</Typography>
            ) : (
              <Grid container spacing={3}>
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </Grid>
            )}
        </Grid>
      </Container>
    </Box>
  );
}
