import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
type Client = {
  id: number;
  name: string;
  last_name: string;
  username: string;
  email: string;
};
export const ClientsByTrainer = () => {
  const { jwt } = useContext(Context);

  if (!useIsAuthJwt(jwt)) {
    return <Navigate to={"/trainer/login"} />;
  }
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    }),
    [jwt]
  );
  const [clients, setClients] = useState<Client[]>([]);
  const [Isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRequest = await axios.get(
          "http://localhost:3050/trainer/clients",

          { headers: headers }
        );

        setClients(clientsRequest.data.data.clients);
        setIsLoading(true);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {Isloading ? (
        <ul>
          {clients.map((client: any) => (
            <li key={client.id}>
              {client.name} {client.last_name} {client.username} {client.email}
            </li>
          ))}
        </ul>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
