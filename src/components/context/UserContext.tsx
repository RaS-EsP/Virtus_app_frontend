import React, { createContext, useState, useEffect } from "react";

export const Context = createContext({
  jwt: "",
});

export function UserContextPROVIDER({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jwt, setJwt] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedJwt = localStorage.getItem("token");
    if (storedJwt !== jwt && storedJwt !== null) {
      setJwt(storedJwt);
    }
  }, [jwt]);

  return <Context.Provider value={{ jwt }}>{children}</Context.Provider>;
}
