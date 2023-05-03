import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "./useIsAuthJwt";
import { URLS } from "../urls";
import { TrainingDetails } from "../Interfaces";
export function useCreateTraining(trainingDetails: TrainingDetails) {
  useEffect(() => {
    if (
      !trainingDetails.trainingName ||
      !trainingDetails.trainingDescription ||
      trainingDetails.exerciseDetails.length === 0
    ) {
      return console.log("More data is needed");
    }
    const createTraining = async () => {
      try {
        const FetchCreateTrainingWithDetails = await axios.post(
          `${URLS.domain}/training/create_with_detail_views`,
          { trainingDetails },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );

        alert("Entrenamiento creado correctamente");
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    createTraining();
  }, [trainingDetails]);
}
