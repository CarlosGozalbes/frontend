import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LandingPage from "./pages/landingPage/LandingPage";
import LoginPage from "./pages/authPages/LoginPage";
import SignupPage from "./pages/authPages/SignUpPage";
import SearchPage from "./pages/searchPage/SearchPage";
import DoctorPage from "./pages/doctorPage/DoctorPage";
import CreateAppointment from "./pages/createAppointmentPage/CreateAppointment";
import MyDatesPage from "./pages/profile/MyDatesPage";
import MyPatientsPage from "./pages/myPatients/MyPatientsPage";
import SearchPatientPage from "./pages/searchPatientPage/SearchPatientPage";
import PatientDatesPage from "./pages/searchPatientPage/PatientDatesPage";
import CreateAppointmentDoctor from "./pages/searchPatientPage/CreateAppointmentDoctor";
import AdminDashboardPage from "./pages/adminDashboardPage/AdminDashboardPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import AdminRoute from "./auth/AdminRoute";
import NotLoggedRoute from "./auth/NotLoggedRoute";
import LoggedRoute from "./auth/LoggedRoute";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import AboutUsPage from "./pages/aboutUsPage/AboutUsPage";
import DoctorRoute from "./auth/DoctorRoute";

import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppBar";
import React from "react";
function App() {
  const [mode, setMode] = React.useState("light");

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
   
    <Router> <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<NotLoggedRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/signup" element={<NotLoggedRoute />}>
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route path="/searchDoctor" element={<SearchPage />} />
        <Route path="/doctor/:id" element={<DoctorPage />} />
        <Route
          path="/create-appointment/:start/:end/:id"
          element={<CreateAppointment />}
        />
        <Route path="/myAppointments" element={<LoggedRoute />}>
          <Route path="/myAppointments" element={<MyDatesPage />} />
        </Route>

        <Route path="/myAppoinmentsDoctor" element={<DoctorRoute />}>
          <Route path="/myAppoinmentsDoctor" element={<MyPatientsPage />} />
        </Route>
        <Route path="/searchPatient" element={<DoctorRoute />}>
          <Route path="/searchPatient" element={<SearchPatientPage />} />
        </Route>
        <Route path="/patient/:id" element={<DoctorRoute />}>
          <Route path="/patient/:id" element={<PatientDatesPage />} />
        </Route>

        <Route
          path="/doctorCreateAppointment/:id"
          element={<CreateAppointmentDoctor />}
        />
        <Route path="/adminUsers" element={<AdminRoute />}>
          <Route path="/adminUsers" element={<AdminDashboardPage />} />
        </Route>
        <Route path="/profile" element={<LoggedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes></ThemeProvider>
    </Router>
    
    
  );
}

export default App;
