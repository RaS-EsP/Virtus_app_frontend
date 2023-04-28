import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Client } from "../Interfaces";
import { getAuthToken } from "./useIsAuthJwt";
export const useGetClientsByTrainer = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [Isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRequest = await axios.get(
          "http://localhost:3050/trainer/clients",

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );

        setClients(clientsRequest.data.data.clients ?? []);
        setIsLoading(true);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    fetchData();
  }, []);
  return { clients, Isloading };
};
