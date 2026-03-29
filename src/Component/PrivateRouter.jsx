// PrivateRouter.js
import React from "react";
import { Navigate, useLocation } from "react-router";
import Useauth from "./Useauth";

const PrivateRouter = ({ children }) => {
  const { user, loading } = Useauth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-green-300 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {

    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }


  return children;
};

export default PrivateRouter;