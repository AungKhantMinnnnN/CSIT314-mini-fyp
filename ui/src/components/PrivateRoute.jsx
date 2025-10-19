import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ user, allowedRoles, loading, children }) => {
  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.userProfileId)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;