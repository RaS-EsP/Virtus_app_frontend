import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthJwt } from "./trainer/hooks/useIsAuthJwt";

export const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return <Navigate to={"/"} />;
};
