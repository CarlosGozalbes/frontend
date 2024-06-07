import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { Container } from "@mui/system";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { useToken } from "../../../auth/useToken";
import {
  insuranceCompanies,
  specializations,
  cities,
} from "../../../data/data";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { useUser } from "../../../auth/useUser";
import axios from "axios";
import Swal from "sweetalert2";

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
export default function ProfileInfo() {
  const { user, loading } = useUser();
  const [isValid, setIsValid] = useState(false);
  const [token, setToken] = useToken();
  const [loadinga, setLoadinga] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedDiploma, setSelectedDiploma] = useState(null);
  const [diplomaName, setDiplomaName] = useState("");
  const [error, setError] = useState("");
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

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
   
    phoneNumber: "",
    address: {
      city: "",
      description: "",
      iframeSrc: "",
      center: "",
    },
    avatar: "",
    role: "User",
    infoDoctor: {
      description: "",
      specialization: "",
    
      insuranceCompanies: [],
      schedule: {
        Lunes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Martes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Miércoles: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Jueves: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Viernes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
      },
    },
  });
  useEffect(() => {
    if (user) {
      setPreviewUrl(user.avatar);
      setSelectedDiploma(user.infoDoctor?.diploma);
      
      const defaultSchedule = {
        Lunes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Martes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Miércoles: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Jueves: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
        Viernes: {
          morning: { start: "", end: "" },
          evening: { start: "", end: "" },
        },
      };

      const mergedSchedule = {
        ...defaultSchedule,
        ...user.infoDoctor?.schedule,
      };
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: {
          city: user.address?.city || "",
          description: user.address?.description || "",
          iframeSrc: user.address?.iframeSrc || "",
          center: user.address?.center || "",
        },
        avatar: user.avatar || "",
        role: user.role || "User",
        infoDoctor: {
          description: user.infoDoctor?.description || "",
          specialization: user.infoDoctor?.specialization || "",
          diploma: user.infoDoctor?.diploma || "",
          insuranceCompanies: user.infoDoctor?.insuranceCompanies || [],
          schedule: mergedSchedule,
        },
      });
    }
  }, [user]);
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
              value={formData.infoDoctor?.schedule[day].morning.start}
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
              value={formData.infoDoctor?.schedule[day].morning.end}
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
              value={formData.infoDoctor?.schedule[day].evening.start}
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
              value={formData.infoDoctor.schedule[day].evening.end}
              onChange={(e) =>
                handleTimeChange(day, "evening", "end", e.target.value)
              }
            />
          </div>
        </div>
      </Grid>
    );
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
  
const handleSubmit = async (event) => {
  event.preventDefault();
  setLoadinga(true);
  setError("");
console.log(formData);
  // General validations
  if (!selectedFile && !user?.avatar) {
    setError("Por favor, seleccione una foto de perfil");
    setLoadinga(false);
    return;
  }
  if (
    !formData.phoneNumber ||
    !formData.address.description ||
    !formData.address.city
  ) {
    setError("Por favor, rellene todos los campos");
    setLoadinga(false);
    return;
  }

  // Doctor-specific validations
  if (user?.role === "Doctor") {
    if (
      !formData.infoDoctor.description ||
      !formData.infoDoctor.specialization ||
      !formData.address.center ||
      !formData.address.iframeSrc
    ) {
      setError("Por favor, rellene todos los campos2");
      setLoadinga(false);
      return;
    }
    if (!isValid) {
      setError("Por favor, configure un horario válido");
      setLoadinga(false);
      return;
    }
  }

  let updatedFormData = { ...formData };

 

   if (selectedFile) {
    const formDataUpload = new FormData();
    formDataUpload.append("file", selectedFile);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/users/avatar",
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedImageUrl = response.data.path; // Adjust based on your backend response

      updatedFormData = {
        ...updatedFormData,
        avatar: uploadedImageUrl,
      };
    } catch (error) {
      console.error("Error uploading the avatar", error);
      setError("Error uploading the avatar");
      setLoadinga(false);
      return;
    }
  } 

  try {
    const response = await axios.put(
      import.meta.env.VITE_API_URL +`/users/me`, // Use the appropriate user ID and endpoint
      updatedFormData, {headers: {Authorization: `Bearer ${token}`} }
    );
    console.log(response.data);
    setLoadinga(false);
    await Swal.fire({
      icon: "success",
      title: "Actualización exitosa!",
      text: "La información del usuario ha sido actualizada.",
      showConfirmButton: false,
      timer: 2000,
    });

     // Redirect to the profile page or any other appropriate page
  } catch (error) {
    setLoadinga(false);
    console.error("Error updating user information", error);
    setError("Error en el servidor: " + (error.response?.data?.error || error.message));
    return;
  }
};
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  return (
    <ThemeProvider theme={theme}>
      <Box
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
            alignItems: "",
            gap: { xs: 3, sm: 6 },
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={previewUrl ? 6 : 12} align="center">
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
              <Grid item xs={12} sm={6} md={6} align="center">
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
            <Grid item xs={6} sm={4}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                fullWidth
                id="surname"
                label="Apellidos"
                name="surname"
                autoComplete="family-name"
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                required
                fullWidth
                id="email"
                label="Cuenta email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
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
            {user?.role === "Doctor" && (
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
                <Grid item xs={12}>
                <Typography 
        component="a" 
        variant="body2"

        href={user?.infoDoctor?.diploma} 
        sx={{ pt: 2, textDecoration: 'none', color: 'blue' }}
      >
        Tu diploma existente
      </Typography>

                </Grid>
               {/*  <Grid item xs={7}>
                  <Button
                    variant="outlined"
                    color="success"
                    height="28px"
                    onClick={() => diplomaInputRef.current?.click()}
                  >
                    Selecciona un nuevo PDF acreditando tu titulacion
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
                )} */}
              </>
            )}
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
<Grid item xs={12}>
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loadinga ? <CircularProgress size={24} /> : "Editar"}
            </Button>
            </Grid>
          </Grid></Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
