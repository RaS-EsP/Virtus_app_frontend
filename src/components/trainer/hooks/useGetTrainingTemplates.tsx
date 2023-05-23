import React, { useEffect, useState } from "react";
import { URLS } from "../../../urls";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { http } from "../../../services/http.training";
import { TrainingList } from "../../../Interfaces";
import { getAuthToken } from "./useIsAuthJwt";

export const useGetTrainingTemplatesByTrainer = () => {
  const [trainings, setTrainings] = useState<TrainingList[]>([]);
  useEffect(() => {
    const GetTrainings = async () => {
      try {
        const TrainingTemplatesFetch = await axios.get(
          `${URLS.domain}/trainingTemplate/getmany`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );

        setTrainings(TrainingTemplatesFetch.data.data.templates ?? []);
        return;
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };

    GetTrainings();
  }, []);

  return { trainings };
};
