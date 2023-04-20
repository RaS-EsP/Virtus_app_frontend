import React, { useEffect, useState } from "react";
import { URLS } from "../urls";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const useGetTrainingsDetailsByTraining = (
  jwt: string,
  headers: AxiosRequestConfig["headers"],
  training_id: string | undefined
) => {
  const [trainingsDetails, setTrainingsDetails] = useState([]);

  useEffect(() => {
    const getTrainingsDetails = async () => {
      try {
        const response = await axios.get(`${URLS.domain}/training_detail/get`, {
          params: { training_id: training_id },
          headers: headers,
        });
        setTrainingsDetails(response.data.data.training_details);
        console.log(trainingsDetails);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    getTrainingsDetails();
  }, []);

  return { trainingsDetails };
};
