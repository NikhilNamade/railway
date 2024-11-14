import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is authenticated

  return isAuthenticated ? children : <Navigate to="/" />; // Redirect to home page if not authenticated
}

export default ProtectedRoute;
