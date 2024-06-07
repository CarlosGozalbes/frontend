import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../../../auth/useToken";
import { Box, Container, alpha } from "@mui/material";
import TableRow from "./TableRow";
import './style.css'
function UserTable() {
  const [users, setUsers] = useState([]);
const [token,setToken] = useToken()
const [sortOrder, setSortOrder] = useState('asc');
  useEffect(() => {
    // Fetch users from backend API
    axios.get(import.meta.env.VITE_API_URL +"/users",{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  const handleSort = () => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.verified - b.verified;
      } else {
        return b.verified - a.verified;
      }
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Box
    id="searchbar"
    sx={(theme) => ({
      pt: { xs: 18, sm: 18 },
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
        <h1>Admin Dashboard: Users</h1>
    
  <div style={{ width: '100%', overflowX: 'auto', height: '500px' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Ciudad</th>
          <th>Rol</th>
          <th>Diploma</th>
          <th onClick={handleSort} style={{ cursor: 'pointer' }}>Verificado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <TableRow user={user} users={users} setUsers={setUsers} key={user._id} />
        ))}
      </tbody>
    </table>
  </div>
    </Container>
    </Box>
  );
}

export default UserTable;
