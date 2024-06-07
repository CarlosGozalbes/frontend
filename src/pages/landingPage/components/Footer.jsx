import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Buffer } from "buffer";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import axios from "axios";
import { useState } from "react";

const logoStyle = {
  width: "120px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="">MediMatch&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
  const addSubscriber = async (email) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL +`/newsletter`, {
        email: email,
      });
      if (response && response.data) {
        console.log("Subscriber added:", response.data);
        // Clear email input after successful subscription
        setEmail("");
        setMessage("Gracias por suscribirte a nuestra newsletter!");
      } else {
        console.error("Error adding subscriber: Empty response");
      }
    } catch (error) {
      setEmail("");
      setMessage("Ha ocurrido un error, por favor intenta de nuevo.");
      console.error("Error adding subscriber:", error);
      throw error;
      
    }

  };

  // Example usage:
  const handleSubmit = (e) => {
    e.preventDefault();
    addSubscriber(email);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box sx={{ ml: "-15px" }}>
              <img
                src={"/imgs/logo.png"}
                style={logoStyle}
                alt="logo of sitemark"
              />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Susbribete a nuestra newsletter gratuita para consejos de salud y
              promociones.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                aria-label="Introduce tu correo electronico"
                placeholder="Introduce tu correo"
                inputProps={{
                  autoComplete: "off",
                  "aria-label": "Introduce tu correo electronico",
                }}
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ flexShrink: 0 }}
              >
                Subscribete
              </Button>
            </Stack>
            {message && (  <Typography variant="body2" color="text.secondary" mb={2}>
              {message}
            </Typography>)}
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Producto
          </Typography>

          <Link color="text.secondary" href="#testimonials">
            Testimonios
          </Link>
          <Link color="text.secondary" href="#highlights">
            Prestaciones
          </Link>
          <Link color="text.secondary" href="#logoCollection">
            Colaboradores
          </Link>
          <Link color="text.secondary" href="#faq">
            Preguntas frecuentes
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Compañia
          </Typography>
          <Link color="text.secondary" href="#">
            Sobre nosotros
          </Link>
          <Link color="text.secondary" href="#">
            Contacto
          </Link>
          <Link color="text.secondary" href="#">
            Privacidad
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            Politica de privacidad
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terminos de servicio
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="inherit"
            href="#"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="#"
            aria-label="X"
            sx={{ alignSelf: "center" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="#"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
