import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useIsAuthJwt } from "../hooks/useIsAuthJwt";

export const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return <Navigate to={"/"} />;
};
