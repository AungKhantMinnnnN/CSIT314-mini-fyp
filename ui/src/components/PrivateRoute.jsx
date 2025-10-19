import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ user, allowedRoles, children }) => {
  if (!user) return <Navigate to="/login" replace />;

  // allowedRoles contains allowed userProfileId(s)
  if (!allowedRoles.includes(user.userProfileId)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;