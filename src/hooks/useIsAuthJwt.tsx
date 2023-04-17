import React from "react";

export function useIsAuthJwt(jwt: string) {
  if (!jwt) {
    console.log("no tienes jwt");
    return false;
  }
  return true;
}
