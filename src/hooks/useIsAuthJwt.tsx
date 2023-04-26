import React from "react";

export function useIsAuthJwt() {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return Boolean(token);
}

export function getAuthToken() {
  return localStorage.getItem("token");
}
