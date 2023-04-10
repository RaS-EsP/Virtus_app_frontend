import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";

export const ClientsByTrainer = (props: any) => {
  const [clients, setClients] = useState([]);
  const [spinnerState, setSpinnerState] = useState(false);
  if (!props.token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `bearer ${props.token}`,
        };
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
