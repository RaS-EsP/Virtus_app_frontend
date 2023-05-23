import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useIsAuthJwt } from "./trainer/hooks/useIsAuthJwt";
export function ProtectRouter(props: any) {
  if (props.role != window.localStorage.getItem("role")) {
    return <Navigate to={"/no_authorizaded"} />;
  }

  return useIsAuthJwt() ? <Outlet /> : <Navigate to="/trainer/login" />;
}
