import React from "react";
import dayjs from "dayjs";
import {
  TextField,
  Button,
  Grid,
  Box,
  Container,
  alpha,
 
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const SearchBar = ({ nameSearch, setNameSearch, handleSearch }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        id="searchbar"
        sx={(theme) => ({
          pt: { xs: 12, sm: 12 },
          pb: { xs: 2, sm: 2 },
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nombre"
                name="Nombre"
                value={nameSearch}
                onChange={(event) =>
                  setNameSearch(
                  
                    event.target.value
                  )
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSearch}
                sx={{ width: { xs: "100%", sm: "auto" }, height: "100%" }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchBar;
