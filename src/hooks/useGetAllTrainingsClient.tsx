import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { URLS } from "../urls";
import { getAuthToken } from "./useIsAuthJwt";
import { useParams } from "react-router-dom";
import { Training } from "../Interfaces";

export function useGetAllTrainingsClient() {
  const [all_trainings_client, setTrainings] = useState<Training[]>([]);
  const { id } = useParams();
  useEffect(() => {
    const getTrainings = async () => {
      try {
        const trainingFetch = await axios.get(
          `${URLS.domain}/scheduled_training/get_trainings_by_client`,

          {
            params: { client_id: id },
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );
        setTrainings(trainingFetch.data.data.ScheduledTraining);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    getTrainings();
  }, []);
  return { all_trainings_client };
}
