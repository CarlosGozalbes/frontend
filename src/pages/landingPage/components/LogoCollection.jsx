
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const whiteLogos = [
  '/imgs/insurance/logoAdeslas.png',
  '/imgs/insurance/logoMuface.png',
  '/imgs/insurance/sanitas-logo.png',
  '/imgs/insurance/DKV.png',
  '/imgs/insurance/mapfre.png',
  '/imgs/insurance/Logo-asisa.png',
];

const darkLogos = [
  '/imgs/insurance/logoAdeslas.png',
  '/imgs/insurance/logoMuface.png',
  '/imgs/insurance/sanitas-logo.png',
  '/imgs/insurance/DKV.png',
  '/imgs/insurance/mapfre.png',
  '/imgs/insurance/Logo-asisa.png',
];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  
  objectFit: 'contain',
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
      >
        Colaboradores de las mejores aseguradoras
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Fake logo company ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}