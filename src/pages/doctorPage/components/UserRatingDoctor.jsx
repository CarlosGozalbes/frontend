import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import axios from "axios";
import { useToken } from "../../../auth/useToken";
import { useUser } from "../../../auth/useUser";

function UserRatingDoctor({ doctorId }) {
    const {user} = useUser()
    const [token,] = useToken()
  const [userRating, setUserRating] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL +`/ratings/user-doctor/${doctorId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
          }
        );
        setUserRating(response.data.rating);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user rating:", error);
        setError(
          error.response?.data?.message || "Error fetching user rating"
        );
        setLoading(false);
      }
    };

    fetchUserRating();
  }, [doctorId]);

  const handleRatingChange = async (event, newValue) => {
    try {
        // Check if the user has already rated the doctor
        const existingRatingResponse = await axios.get(
          import.meta.env.VITE_API_URL +`/ratings/user-doctor/${doctorId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Assuming you have the user's token
                },
            }
        );
console.log("existingRatingResponse",existingRatingResponse.data);
        if (existingRatingResponse.data.rating) {
            // If an existing rating is found, update it with the new value
            await axios.put(
              import.meta.env.VITE_API_URL +`/ratings/${existingRatingResponse.data._id}`,
                {
                    value: newValue,
                    author: user._id,
                    doctor: doctorId,
                },
            );
        } else {
            // If no existing rating is found, create a new one
            await axios.post(
              import.meta.env.VITE_API_URL +`/ratings`,
                {
                    value: newValue,
                    author: user._id,
                    doctor: doctorId,
                },
            );
        }

        // Update the user's rating state with the new value
        setUserRating(newValue);
    } catch (error) {
        setError(error.response?.data?.message || "Error posting rating");
    }
};

  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        align="left"
        color="text.primary"
        marginTop={2}
      >
        Valora al doctor
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Rating
          name="size-large"
          value={userRating || 1}
          onChange={handleRatingChange}
          size="large"
        />
      )}
    </>
  );
}

export default UserRatingDoctor;
