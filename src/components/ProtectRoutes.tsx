import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useIsAuthJwt } from "../hooks/useIsAuthJwt";
export function ProtectRouter() {
  return useIsAuthJwt() ? <Outlet /> : <Navigate to="/trainer/login" />;
}
