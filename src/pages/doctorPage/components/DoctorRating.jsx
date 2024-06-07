import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';

function DoctorRating({ doctorId }) {
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL +`/ratings/doctor/${doctorId}`);
        setAverageRating(response.data.averageRating);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching rating');
        setLoading(false);
      }
    };

    fetchRating();
  }, [doctorId]);

  return (
    <div>
    
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : averageRating !== null ? (
        <Rating name="doctor-rating" value={averageRating} readOnly />
      ) : (
        <Typography>No ratings found for this doctor</Typography>
      )}
    </div>
  );
}

export default DoctorRating;
