import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
/* import { blue } from '@mui/material/colors';
 */
/* const whiteLogos = [
  '/imgs/categories/Cardiologia.png',
  '/imgs/categories/ortopedist.png',
  '/imgs/categories/dermatologist.png',
  '/imgs/categories/dentist.png',
  '/imgs/categories/neurologist.png',
  '/imgs/categories/test.png',
];

const darkLogos = [
  '/imgs/categories/cardiologist.png',
  '/imgs/categories/ortopedist.png',
  '/imgs/categories/dermatologist.png',
  '/imgs/categories/dentist.png',
  '/imgs/categories/neurologist.png',
  '/imgs/categories/test.png',
]; */

const logoStyle = {
  width: "120px",
  height: "120px",
  margin: "0 32px",

  objectFit: "contain",
};

export default function Categories() {
  const theme = useTheme();
  /*  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos; */

  return (
    <Box id="Categories" sx={{ py: 4 }}>
      <Typography
        component="h2"
        variant="h4"
        align="center"
        color="text.primary"
      >
        Categorias
      </Typography>
      <Grid container justifyContent="center" gap={1} sx={{ mt: 0.5 }}>
        {/*  {logos.map((logo, index) => (
              <Grid item key={index} sx={{ padding:"10px 0",borderRadius:"10px",bgcolor: "#DAEBFE", "&:hover": { bgcolor: "#B3D4F2", cursor: "pointer" } }}>
              <img
                src={logo}
                alt={`Fake category ${index + 1}`}
                style={logoStyle}
              />
              <Typography variant="subtitle1" sx={{fontWeight:"600"}} align="center">Fake category {index + 1}</Typography>
            </Grid>
        ))} */}
        <Grid
          item
          key={"cardiologia"}
          sx={{
            padding: "10px 0",
            borderRadius: "10px",

            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(to bottom, #DAEBFE, #fbfdfe)"
                : "linear-gradient(to bottom, #042748, #0d3a6b)",
            /* bgcolor: theme.palette.mode === 'light'? "#DAEBFE": "#042748",  */
            "&:hover": {
              backgroundImage:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #B3D4F2, #DAEBFE)"
                  : "linear-gradient(to bottom, #063C6E, #828d98)",
              cursor: "pointer",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 8px rgba(255, 255, 255, 0.5)", // Light box shadow
            },
            /* backgroundImage: "linear-gradient(to bottom, #DAEBFE, #fbfdfe)" */ // Gradient background
          }}
        >
          <img
            src={"/imgs/categories/Cardiologia.png"}
            alt={`cardiologia`}
            style={logoStyle}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            align="center"
          >
            Cardiologos
          </Typography>
        </Grid>
        <Grid
          item
          key={"analisis"}
          sx={{
            padding: "10px 0",
            borderRadius: "10px",

            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(to bottom, #DAEBFE, #fbfdfe)"
                : "linear-gradient(to bottom, #042748, #0d3a6b)",
            /* bgcolor: theme.palette.mode === 'light'? "#DAEBFE": "#042748",  */
            "&:hover": {
              backgroundImage:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #B3D4F2, #DAEBFE)"
                  : "linear-gradient(to bottom, #063C6E, #828d98)",
              cursor: "pointer",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 8px rgba(255, 255, 255, 0.5)", // Light box shadow
            },
            /* backgroundImage: "linear-gradient(to bottom, #DAEBFE, #fbfdfe)" */ // Gradient background
          }}
        >
          <img
            src={"/imgs/categories/Análisis.png"}
            alt={`analisis`}
            style={logoStyle}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            align="center"
          >
            Análisis
          </Typography>
        </Grid>
        <Grid
          item
          key={"dentista"}
          sx={{
            padding: "10px 0",
            borderRadius: "10px",

            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(to bottom, #DAEBFE, #fbfdfe)"
                : "linear-gradient(to bottom, #042748, #0d3a6b)",
            /* bgcolor: theme.palette.mode === 'light'? "#DAEBFE": "#042748",  */
            "&:hover": {
              backgroundImage:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #B3D4F2, #DAEBFE)"
                  : "linear-gradient(to bottom, #063C6E, #828d98)",
              cursor: "pointer",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 8px rgba(255, 255, 255, 0.5)", // Light box shadow
            },
            /* backgroundImage: "linear-gradient(to bottom, #DAEBFE, #fbfdfe)" */ // Gradient background
          }}
        >
          <img
            src={`/imgs/categories/Dentista.png`}
            alt={`dentista`}
            style={logoStyle}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            align="center"
          >
            Dentistas
          </Typography>
        </Grid>
        <Grid
          item
          key={"dermatologo"}
          sx={{
            padding: "10px 0",
            borderRadius: "10px",

            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(to bottom, #DAEBFE, #fbfdfe)"
                : "linear-gradient(to bottom, #042748, #0d3a6b)",
            /* bgcolor: theme.palette.mode === 'light'? "#DAEBFE": "#042748",  */
            "&:hover": {
              backgroundImage:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #B3D4F2, #DAEBFE)"
                  : "linear-gradient(to bottom, #063C6E, #828d98)",
              cursor: "pointer",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 8px rgba(255, 255, 255, 0.5)", // Light box shadow
            },
            /* backgroundImage: "linear-gradient(to bottom, #DAEBFE, #fbfdfe)" */ // Gradient background
          }}
        >
          <img
            src={"/imgs/categories/Dermatólogo.png"}
            alt={`dermatologo`}
            style={logoStyle}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            align="center"
          >
            Dematólogos{" "}
          </Typography>
        </Grid>
        <Grid
          item
          key={"Neurólogo"}
          sx={{
            padding: "10px 0",
            borderRadius: "10px",

            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(to bottom, #DAEBFE, #fbfdfe)"
                : "linear-gradient(to bottom, #042748, #0d3a6b)",
            /* bgcolor: theme.palette.mode === 'light'? "#DAEBFE": "#042748",  */
            "&:hover": {
              backgroundImage:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #B3D4F2, #DAEBFE)"
                  : "linear-gradient(to bottom, #063C6E, #828d98)",
              cursor: "pointer",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 8px rgba(255, 255, 255, 0.5)", // Light box shadow
            },
            /* backgroundImage: "linear-gradient(to bottom, #DAEBFE, #fbfdfe)" */ // Gradient background
          }}
        >
          <img
            src={"/imgs/categories/Neurólogo.png"}
            alt={`Neurólogo`}
            style={logoStyle}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            align="center"
          >
            Neurólogos
          </Typography>
        </Grid>
        <Grid
          item
          key={"Traumatologo"}
          sx={{
            padding: "10px 0",
            borderRadius: "10px",

            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(to bottom, #DAEBFE, #fbfdfe)"
                : "linear-gradient(to bottom, #042748, #0d3a6b)",
            /* bgcolor: theme.palette.mode === 'light'? "#DAEBFE": "#042748",  */
            "&:hover": {
              backgroundImage:
                theme.palette.mode === "light"
                  ? "linear-gradient(to bottom, #B3D4F2, #DAEBFE)"
                  : "linear-gradient(to bottom, #063C6E, #828d98)",
              cursor: "pointer",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 8px rgba(255, 255, 255, 0.5)", // Light box shadow
            },
            /* backgroundImage: "linear-gradient(to bottom, #DAEBFE, #fbfdfe)" */ // Gradient background
          }}
        >
          <img
            src={"/imgs/categories/Traumatologo.png"}
            alt={`Traumatologo`}
            style={logoStyle}
          />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            align="center"
          >
            Traumatólogos{" "}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
