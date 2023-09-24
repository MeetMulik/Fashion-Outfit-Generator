import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const ProtectedRoute = ({ children }) => {
  const [{ user }, dispatch] = useStateValue();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
