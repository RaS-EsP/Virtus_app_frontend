import React, { useEffect, useState } from "react";
import { URLS } from "../urls";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const useGetTrainingsByTrainer = (
  jwt: string,
  headers: AxiosRequestConfig["headers"]
) => {
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    const GetTrainings = async () => {
      try {
        const exercisesFetch = await axios.get(
          `${URLS.domain}/training/get_trainings`,
          { headers: headers }
        );
        setTrainings(exercisesFetch.data.data.trainings);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    GetTrainings();
  }, []);

  return { trainings };
};
