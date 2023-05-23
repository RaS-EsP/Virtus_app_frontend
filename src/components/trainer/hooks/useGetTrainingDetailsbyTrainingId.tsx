import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "./useIsAuthJwt";
import { URLS } from "../../../urls";
export const useGetTrainingDetailsbyTrainingTemplateId = () => {
  const [trainingsDetails, setTrainingsDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getTrainingsDetails = async () => {
      try {
        const response = await axios.get(
          `${URLS.domain}/trainingdetails/getmany`,
          {
            params: { id: id },
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );
        setTrainingsDetails(response.data.data.Training_details);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };

    getTrainingsDetails();
  }, []);
  return { trainingsDetails };
};
