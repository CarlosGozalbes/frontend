import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "../../components/AppAppBar";
import SearchBar from "./components/SearchBar";
import { Box, Divider } from "@mui/material";
import Footer from "../landingPage/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

import PatientsList from "./components/PatientsList";
import { useToken } from "../../auth/useToken";

function SearchPatientPage() {
  const [token,setToken] = useToken()
  const [mode, setMode] = useState("light");
  const [nameSearch, setNameSearch] = useState(
    ""
  );
  const defaultTheme = createTheme({ palette: { mode } });
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

const handleSearch = () => {


  const filtered = patients.filter((patient) => {
    // Filter by name, city, and specialization
    const matchesName = nameSearch ? ((patient.name && patient.name.toLowerCase().includes(nameSearch.toLowerCase())) || (patient.surname && patient.surname.toLowerCase().includes(nameSearch.toLowerCase()))) : true;
    

    return matchesName 
  });

setFilteredPatients(filtered);
};

useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL +"/users/patients/me", {  headers: {
          Authorization: `Bearer ${token}`
        }});
        setPatients(response.data);
        setFilteredPatients(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
        setError("Error fetching doctors: " + error.message);
      }
    };

    fetchDoctors();
  }, []);
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <SearchBar handleSearch={handleSearch} nameSearch={nameSearch} setNameSearch={setNameSearch} />
        <Divider />
        <Box style={{ flex: "1" }}>
          <PatientsList filteredPatients={filteredPatients} error={error} />
        </Box>
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default SearchPatientPage;
