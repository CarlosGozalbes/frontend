import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  styled,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import Swal from "sweetalert2";
import {insuranceCompanies, specializations, cities } from "../../../data/data";

const theme = createTheme();
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
export default function SignUpStep2({ setStep, formData, setFormData }) {
 const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [diplomaName, setDiplomaName] = useState("");
  const [error, setError] = useState("");
  const [isDoctor, setIsDoctor] = useState(formData.role === "Doctor");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const diplomaInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const clearFile = () => {
    fileInputRef.current.value = null;

    setSelectedFile(null);
    setPreviewUrl(null);
  };
  const handleDiplomaChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedDiploma(file);
      setDiplomaName(file.name);
    }
  };

  const clearDiploma = () => {
    diplomaInputRef.current.value = null;
    setSelectedDiploma(null);
    setDiplomaName("");
  };

  const handleCheckboxChange = (event) => {
    setIsDoctor(event.target.checked);
    setFormData({
      ...formData,
      role: event.target.checked ? "Doctor" : "User",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
     // General validations
  if (!selectedFile) {
    setError("Por favor, seleccione una foto de perfil");
    setLoading(false);
    return;
  }
  if (
    !formData.phoneNumber ||
    !formData.address.description ||
    !formData.address.city
  ) {
    setError("Por favor, rellene todos los campos");
    setLoading(false);
    return;
  }

  // Doctor-specific validations
  if (isDoctor) {
    console.log(formData);
    if (
      !formData.infoDoctor.description ||
      !formData.infoDoctor.specialization ||
      !formData.address.center ||
      !formData.address.iframeSrc
    ) {
      setError("Por favor, rellene todos los campos");
      setLoading(false);
      return;
    }
    if (!isValid) {
      setError("Por favor, configure un horario válido");
      setLoading(false);
      return;
    }
  }
   
    let updatedFormData = { ...formData };

    if (selectedDiploma) {
      const uploadFormData = new FormData();
      uploadFormData.append("diploma", selectedDiploma);

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/users/uploadDiploma",
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const uploadedDiplomaUrl = response.data.url; // Adjust based on your backend response
        
        updatedFormData = {
          ...updatedFormData,
          infoDoctor: {
            ...updatedFormData.infoDoctor,
            diploma: uploadedDiplomaUrl,
          },
        };
        /*  setFormData((prevFormData) => ({
          ...prevFormData,
          infoDoctor: {
            ...prevFormData.infoDoctor,
            diploma: uploadedDiplomaUrl,
          },
        })); */
      } catch (error) {
        console.error("Error uploading the diploma", error);
        
      }
    }
    if (selectedFile) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", selectedFile);
      // Add any other form data you need to send
      // formData.append('otherField', 'value');

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/users/avatar",
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageUrl = response.data.path;
      console.log("LOG IMAGEN 1"+uploadedImageUrl); // Adjust based on your backend response
      /* setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: uploadedImageUrl,
      })); */
      updatedFormData = {
        ...updatedFormData,
        avatar: 
          uploadedImageUrl
        ,
      };
      console.log("LOG DESPUES DE METER IMAGEN" +updatedFormData);
    }
    console.log(updatedFormData);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL +"/users/register",
        updatedFormData
      );
      console.log(response.data);
      setLoading(false);
      await Swal.fire({
        icon: "success",
        title: "Registro exitoso!",
        text: "Se te rederigira a la pagina de logeo.",
        showConfirmButton: false,
        timer: 2000, 
      });
      
      navigate("/login");
      
    } catch (error) {
      setLoading(false);
      console.error("Error registering user", error);
      setError("Error en el servidor: " + error.response.data.error); // Set error message here
      return;
    }

    /* navigate("/");  */
  };
  const handleTimeChange = (day, period, field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      infoDoctor: {
        ...prevFormData.infoDoctor,
        schedule: {
          ...prevFormData.infoDoctor.schedule,
          [day]: {
            ...prevFormData.infoDoctor.schedule[day],
            [period]: {
              ...prevFormData.infoDoctor.schedule[day][period],
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const validateSchedule = () => {
    for (const day of Object.keys(formData.infoDoctor.schedule)) {
      const { morning, evening } = formData.infoDoctor.schedule[day];

      // Check if morning start and end are both filled or both empty, and end is not earlier than start
      if (
        (morning.start && !morning.end) ||
        (!morning.start && morning.end) ||
        (morning.start && morning.end && morning.start >= morning.end)
      ) {
        return false;
      }

      // Check if evening start and end are both filled or both empty, and end is not earlier than start
      if (
        (evening.start && !evening.end) ||
        (!evening.start && evening.end) ||
        (evening.start && evening.end && evening.start >= evening.end)
      ) {
        return false;
      }

      // Check if evening start is not earlier than morning end
      if (morning.end && evening.start && evening.start <= morning.end) {
        return false;
      }
    }
    return true;
  };
  const [isValid, setIsValid] = useState(false);
  /* const isValid = validateSchedule(); */
  useEffect(() => {
    setIsValid(validateSchedule());
    setError("");
    
  }, [formData]);
  const renderScheduleGrid = (day) => {
    return (
      <Grid item xs={6} sm={4} md={2.4} key={day}>
        <Typography component="h1" variant="h6">
          {day}
        </Typography>
        <Typography variant="body2">Mañana</Typography>
        <div style={{ display: "flex", justifyContent: "start", gap: "4px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor={`${day}MorningStart`} style={{ fontSize: "12px" }}>
              Comienzo
            </label>
            <input
              type="time"
              id={`${day}MorningStart`}
              name={`${day}MorningStart`}
              min="00:01"
              max="23:59"
              onChange={(e) =>
                handleTimeChange(day, "morning", "start", e.target.value)
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor={`${day}MorningEnd`} style={{ fontSize: "12px" }}>
              Final
            </label>
            <input
              type="time"
              id={`${day}MorningEnd`}
              name={`${day}MorningEnd`}
              min="00:01"
              max="23:59"
              onChange={(e) =>
                handleTimeChange(day, "morning", "end", e.target.value)
              }
            />
          </div>
        </div>
        <Typography variant="body2">Tarde</Typography>
        <div style={{ display: "flex", justifyContent: "start", gap: "4px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor={`${day}EveningStart`} style={{ fontSize: "12px" }}>
              Comienzo
            </label>
            <input
              type="time"
              id={`${day}EveningStart`}
              name={`${day}EveningStart`}
              min="00:01"
              max="23:59"
              onChange={(e) =>
                handleTimeChange(day, "evening", "start", e.target.value)
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor={`${day}EveningEnd`} style={{ fontSize: "12px" }}>
              Final
            </label>
            <input
              type="time"
              id={`${day}EveningEnd`}
              name={`${day}EveningEnd`}
              min="00:01"
              max="23:59"
              onChange={(e) =>
                handleTimeChange(day, "evening", "end", e.target.value)
              }
            />
          </div>
        </div>
      </Grid>
    );
  };

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Paso 2
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} align="center">
                <Button
                  variant="outlined"
                  color="success"
                  height="28px"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Selecciona tu foto de perfil
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                  ref={fileInputRef}
                />
              </Grid>
              {previewUrl && (
                <Grid item xs={12} sm={12} md={12} align="center">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "275px",
                    }}
                  >
                    <Typography variant="body2">Vista previa:</Typography>
                    <ClearIcon
                      style={{ cursor: "pointer" }}
                      onClick={clearFile}
                    />
                  </div>

                  <img
                    src={previewUrl}
                    alt="Image Preview"
                    width="275px"
                    height="275px"
                    style={{
                      objectFit: "contain",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Número de Teléfono"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <TextField
                  required
                  fullWidth
                  id="addressDescription"
                  label="Descripción de la Dirección"
                  name="addressDescription"
                  value={formData.address.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
               
                 <Autocomplete
                      
                      disablePortal
                      id="combo-box-demo"
                      options={cities}
                      value={formData.address.city}
                      onChange={(event, newValue) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            city: newValue,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Ciudad" />
                      )}
                    />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isDoctor}
                      onChange={handleCheckboxChange}
                      name="registerAsDoctor"
                      color="primary"
                    />
                  }
                  label="Quiero registrarme como Doctor"
                />
              </Grid>
              {isDoctor && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Textarea
                      id="infoDoctorDescription"
                      aria-label="minimum height"
                      minRows={8.65}
                      label="Descripción del Doctor"
                      placeholder="Describa su experiencia y trayectoria como doctor"
                      name="infoDoctorDescription"
                      value={formData.infoDoctor.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          infoDoctor: {
                            ...formData.infoDoctor,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={specializations}
                      value={formData.infoDoctor.specialization}
                      onChange={(event, newValue) =>
                        setFormData({
                          ...formData,
                          infoDoctor: {
                            ...formData.infoDoctor,
                            specialization: newValue,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Especialidad" />
                      )}
                    />
                    <Autocomplete
                      sx={{ pt: 2.5 }}
                      multiple
                      id="tags-standard"
                      options={insuranceCompanies}
                      /*  getOptionLabel={(option) => option.title} */
                      value={formData.infoDoctor.insuranceCompanies}
                      onChange={(event, newValue) =>
                        setFormData({
                          ...formData,
                          infoDoctor: {
                            ...formData.infoDoctor,
                            insuranceCompanies: newValue,
                          },
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Compañias de seguro"
                          placeholder="Compañias de seguro con las que trabaja"
                        />
                      )}
                    />
                   <TextField
                   sx={{ mt: 2.5 }}
                  required
                  fullWidth
                  id="iframeSrc"
                  label="Iframe Source"
                  name="iframeSrc"
                  value={formData.address.iframeSrc}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        iframeSrc: e.target.value,
                      },
                    })
                  }
                />
                <TextField
                  sx={{ mt: 2.5 }}
                  fullWidth
                  id="center"
                  label="Centro"
                  name="center"
                  value={formData.address.center}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        center: e.target.value,
                      },
                    })
                  }
                />
                  </Grid>
                  <Grid item xs={12}>
                    {" "}
                    <Divider />
                    <Typography component="h1" variant="h5" sx={{ pt: 2 }}>
                      Horario
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {" "}
                    <Grid container>
                      {daysOfWeek.map((day) => renderScheduleGrid(day))}
                      {isValid ? (
                        <p>Horario valido</p>
                      ) : (
                        <p>Horario no válido</p>
                      )}{" "}
                    </Grid>
                    <Divider />
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      variant="outlined"
                      color="success"
                      height="28px"
                      onClick={() => diplomaInputRef.current?.click()}
                    >
                      Selecciona tu PDF acreditando tu titulacion
                    </Button>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleDiplomaChange}
                      hidden
                      ref={diplomaInputRef}
                    />
                  </Grid>{" "}
                  {diplomaName && (
                    <Grid item xs={5}>
                      <div
                        style={{
                          display: "flex",
                          paddingTop: "5px",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2">{diplomaName}</Typography>
                        <ClearIcon
                          style={{ cursor: "pointer" }}
                          onClick={clearDiploma}
                        />
                      </div>
                    </Grid>
                  )}
                </>
              )}
              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}
            </Grid>
            <Button type="submit" disabled={loading} variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? <CircularProgress size={24} /> : 'Registrarse'}
            </Button>
            <Button
              onClick={() => setStep(1)}
              variant="outlined"
              disabled={loading}
              sx={{ mt: 3, mb: 2, ml: 2 }}
            >
              Volver
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


