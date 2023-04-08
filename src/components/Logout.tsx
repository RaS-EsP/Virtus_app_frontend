import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Logout = (props: any) => {
  if (!props.token) {
    return <Navigate to={"/"} />;
  }
  useEffect(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return <Navigate to={"/"} />;
};
