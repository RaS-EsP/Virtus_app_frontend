import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./context/UserContext";
import { useIsAuthJwt } from "../hooks/useIsAuthJwt";

export const Logout = () => {
  const { jwt } = useContext(Context);

  if (!useIsAuthJwt(jwt)) {
    return <Navigate to={"/trainer/login"} />;
  }

  useEffect(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return <Navigate to={"/"} />;
};
