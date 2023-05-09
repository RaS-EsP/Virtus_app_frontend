import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "./useIsAuthJwt";
import { URLS } from "../urls";
export const useGetTrainingDetailsbyTrainingId = () => {
  const [trainingsDetails, setTrainingsDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getTrainingsDetails = async () => {
      try {
        const response = await axios.get(`${URLS.domain}/training_detail/get`, {
          params: { training_id: id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        });
        setTrainingsDetails(response.data.data.training_details);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };

    getTrainingsDetails();
  }, []);
  return { trainingsDetails };
};
