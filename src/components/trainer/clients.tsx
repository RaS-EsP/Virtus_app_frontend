import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { UserContext } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { useGetClientsByTrainer } from "../../hooks/useGetClientsByTrainer";
import { Client } from "../../Interfaces";
export const ClientsByTrainer = () => {
  const { clients, Isloading } = useGetClientsByTrainer();

  return (
    <div>
      {Isloading ? (
        <ul>
          {clients.map((client: Client) => (
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
