import React, { useEffect, useState } from "react";
import { URLS } from "../../../urls";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAuthToken } from "./useIsAuthJwt";
export const useGetExercisesByTrainer = () => {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    const GetExercises = async () => {
      try {
        const exercisesFetch = await axios.get(
          `${URLS.domain}/exercise/getmany`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );
        setExercises(exercisesFetch.data.data.exercises);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    GetExercises();
  }, []);

  return { exercises };
};
