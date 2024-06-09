import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "../../components/AppAppBar";
import SearchBar from "./components/SearchBar";
import { Box, Divider } from "@mui/material";
import Footer from "../landingPage/components/Footer";
import DoctorList from "./components/DoctorList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { checkDoctorAvailability } from "../../functions/appointments";
import { useUser } from "../../auth/useUser";

function SearchPage() {
  const {user,loading} = useUser()

  const [filterForm, setFilterForm] = useState({
    name: "",
    city: "",
    specialization: "",
    startDate: null,
    endDate: null,
  });
 
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

const handleSearch = () => {
  const { name, city, specialization, startDate, endDate } = filterForm;

  const filtered = doctors.filter((doctor) => {
    // Filter by name, city, and specialization
    const matchesName = name ? ((doctor.name && doctor.name.toLowerCase().includes(name.toLowerCase())) || (doctor.surname && doctor.surname.toLowerCase().includes(name.toLowerCase()))) : true;
    const matchesCity = city ? (doctor.address.city && doctor.address.city.toLowerCase().includes(city.toLowerCase())) : true;
    const matchesSpecialization = specialization ? (doctor.infoDoctor.specialization && doctor.infoDoctor.specialization.toLowerCase().includes(specialization.toLowerCase())) : true;

    // Check doctor's availability only if both startDate and endDate are not null
    let isAvailable = true;
    if (startDate && endDate) {
      isAvailable = checkDoctorAvailability(doctor, startDate, endDate);
    }

    return matchesName && matchesCity && matchesSpecialization && isAvailable;
  });

  console.log(filterForm);
  setFilteredDoctors(filtered);
};


useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL +"/users/doctors", );
        const filteredData = response.data.filter((doctor) => {
          console.log("User ID:", user?._id);
          console.log("Doctor ID:", doctor._id);
          return doctor._id !== user?._id;
        });
        setDoctors(filteredData);
        setFilteredDoctors(filteredData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
        setError("Error fetching doctors: " + error.message);
      }
    };

    fetchDoctors();
  }, [loading]);
 
  if (loading) {
    return <div>Loading...</div>;
  }
  return (

      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <SearchBar handleSearch={handleSearch} filterForm={filterForm} setFilterForm={setFilterForm} />
        <Divider />
        <Box style={{ flex: "1" }}>
          <DoctorList doctors={doctors} filteredDoctors={filteredDoctors} error={error} />
        </Box>
        <Divider />
        <Footer />
      </Box>
   
  );
}

export default SearchPage;
