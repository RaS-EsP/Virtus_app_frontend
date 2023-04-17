import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";

export const ClientsByTrainer = () => {
  const { jwt } = useContext(Context);

  if (!useIsAuthJwt(jwt)) {
    return <Navigate to={"/trainer/login"} />;
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${jwt}`,
  };
  const [clients, setClients] = useState([]);
  const [spinnerState, setSpinnerState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRequest = await axios.get(
          "http://localhost:3050/trainer/clients",

          { headers: headers }
        );

        setClients(clientsRequest.data.data.clients);
        setSpinnerState(true);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {spinnerState ? (
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
