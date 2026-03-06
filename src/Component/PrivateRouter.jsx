// PrivateRouter.js
import React from "react";
import { Navigate, useLocation } from "react-router";
import Useauth from "./Useauth";

const PrivateRouter = ({ children }) => {
  const { user } = Useauth();
  const location = useLocation(); 

  if (!user) {
  
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  
  return children;
};

export default PrivateRouter;