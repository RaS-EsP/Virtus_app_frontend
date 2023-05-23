import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { useIsAuthJwt } from "./hooks/useIsAuthJwt";
import { useGetClientsByTrainer } from "./hooks/useGetClientsByTrainer";
import { Client } from "../../Interfaces";
import { URLS } from "../../urls";
export const ClientsByTrainer = () => {
  const { clients, Isloading } = useGetClientsByTrainer();

  return (
    <div>
      {Isloading ? (
        <ul>
          {clients.map((client: Client) => (
            <li key={client.id}>
              <a href={`${URLS.domain_client}/trainer/clients/${client.id}`}>
                {client.name}
              </a>{" "}
              {client.last_name} {client.username} {client.email}
            </li>
          ))}
        </ul>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
