import React, { useState } from "react";
import Swal from "sweetalert2";
import { useToken } from "../../../auth/useToken";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
function TableRow({ user, users, setUsers }) {
  const [token, setToken] = useToken();
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: {
      city: user.address.city,
    },
    role: user.role,
    
      verified: user.verified,
    
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        verified: checked,
      }));
    } else if (name.startsWith("address.")) {
      // Update nested state immutably
      const addressKey = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressKey]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleEdit = async (id) => {

     try {
      const response = await fetch(import.meta.env.VITE_API_URL +`/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to edit user.");
      }

      // Update users state with new values
      const index = users.findIndex((u) => u._id === id);
      if (index !== -1) {
        const updatedUsers = [...users];
        updatedUsers[index] = { ...user, ...formData };
        setUsers(updatedUsers);
      }

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User data updated successfully!",
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } 
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL +`/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      // Remove user from users state
      const updatedUsers = users.filter((u) => u._id !== id);
      setUsers(updatedUsers);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User deleted successfully!",
      });
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };
  const cities = [
    "Almería",
    "Cádiz",
    "Córdoba",
    "Granada",
    "Huelva",
    "Jaén",
    "Málaga",
    "Sevilla",
  ];

  // Define options for roles
  const roles = ["User", "Doctor", "Admin"];

  // Function to check if formData is different from user data
  const isDataChanged = () => {
    return Object.keys(formData).some((key) => {
      if (typeof formData[key] === "object") {
        return Object.keys(formData[key]).some(
          (subKey) => formData[key][subKey] !== user[key][subKey]
        );
      }
      return formData[key] !== user[key];
    });
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <select
          name="address.city"
          value={formData.address.city}
          onChange={handleInputChange}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select name="role" value={formData.role} onChange={handleInputChange}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </td>
      <td>
        {user.infoDoctor?.diploma ? (
          <a href={user.infoDoctor?.diploma}>Diploma</a>
        ) : (
          "-"
        )}
      </td>
      <td>
        {user.role === "Doctor" ? (
          <input
            type="checkbox"
            name="verified"
            checked={formData.verified}
            onChange={handleInputChange}
          />
        ) : (
          "-"
        )}
      </td>
      <td style={{ display: "flex", gap: "5px", border:"none", borderBottom:"1px solid black",height:"65px"}}>
      <IconButton
        aria-label="edit"
        onClick={() => handleEdit(user._id)}
        disabled={!isDataChanged()}
        style={{
          border: isDataChanged() ? "none" : "1px solid green",
          backgroundColor: isDataChanged() ? "green" : "transparent",
        }}
        size="large"
      >
        <SaveIcon style={{ color: isDataChanged() ? "white" : "green" }} />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => handleDelete(user._id)}
        style={{
          border: "1px solid red",
          color: "red",
        }}
        size="large"
      >
        <DeleteIcon />
      </IconButton>
      </td>
    </tr>
  );
}

export default TableRow;
