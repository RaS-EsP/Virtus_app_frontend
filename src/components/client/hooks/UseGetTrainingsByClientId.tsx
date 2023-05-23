import React, { useState, useEffect } from "react";
import { Scheduled_trainings } from "../../../Interfaces";
import { URLS } from "../../../urls";
import { getAuthToken } from "../../trainer/hooks/useIsAuthJwt";
import axios, { AxiosError } from "axios";

export const UseGetTrainingsByClientId = () => {
  const [TrainingsList, setTrainingList] = useState<Scheduled_trainings[]>([]);
  useEffect(() => {
    const getScheduledTrainings = async () => {
      try {
        const responseScheduledTrainings = await axios.get(
          `${URLS.domain}/training/get_by_client`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );

        setTrainingList(responseScheduledTrainings.data.data.trainings);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    getScheduledTrainings();
  }, []);
  return { TrainingsList };
};
