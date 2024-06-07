import React from "react";
import dayjs from "dayjs";
import {
  TextField,
  Button,
  Grid,
  Box,
  Container,
  alpha,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { cities, specializations } from "../../../data/data";
import { DatePicker } from "@mui/x-date-pickers";

const SearchBar = ({ filterForm, setFilterForm, handleSearch }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nombre"
                name="Nombre"
                value={filterForm.name}
                onChange={(event) =>
                  setFilterForm({
                    ...filterForm,
                    name: event.target.value, // Access the new value from event.target.value
                  })
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cities}
                value={filterForm.city}
                onChange={(event, newValue) =>
                  setFilterForm({
                    ...filterForm,
                    city: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Ciudad" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={specializations}
                value={filterForm.specialization}
                onChange={(event, newValue) =>
                  setFilterForm({
                    ...filterForm,
                    specialization: newValue,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Especialidad" />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <DatePicker
                label="Cita entre la fecha"
                value={filterForm.startDate}
                minDate={dayjs()}
                maxDate={filterForm.endDate}
                onChange={(newValue) =>
                  setFilterForm({
                    ...filterForm,
                    startDate: newValue,
                  })
                }
                slotProps={{ textField: { fullWidth: true } }}

              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <DatePicker
                label="y la fecha"
                value={filterForm.endDate}
                minDate={filterForm.startDate?filterForm.startDate:dayjs()}
                maxDate={dayjs().add(1, "year")}
                onChange={(newValue) =>
                  setFilterForm({
                    ...filterForm,
                    endDate: newValue,
                  })
                }
                slotProps={{ textField: { fullWidth: true } }}

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
