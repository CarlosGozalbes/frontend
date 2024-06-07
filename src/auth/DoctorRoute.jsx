import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from './useUser'; // Assuming you have a custom hook to get the current user

const DoctorRoute = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect if there's an error or the user is not an admin
    if (error || (!loading && user && user.role !== 'Doctor')) {
      // Use Navigate to redirect to the desired location
      // You can redirect to '/' or any other route
     navigate('/')
    }
  }, [user, loading, error]);

  if (loading) {
    // Render loading indicator or placeholder while fetching user data
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default DoctorRoute;
