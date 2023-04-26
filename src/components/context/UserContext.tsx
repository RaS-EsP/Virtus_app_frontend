import React, { createContext, useMemo, useState, useEffect } from "react";

export const UserContext = createContext({
  jwt: "",
  headers: {},
});

export function UserContextPROVIDER({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jwt, setJwt] = useState(localStorage.getItem("token") || "");
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    }),
    [jwt]
  );
  useEffect(() => {
    const storedJwt = localStorage.getItem("token");
    if (storedJwt !== jwt && storedJwt !== null) {
      setJwt(storedJwt);
    }
  }, [jwt]);

  return (
    <UserContext.Provider value={{ jwt, headers }}>
      {children}
    </UserContext.Provider>
  );
}
