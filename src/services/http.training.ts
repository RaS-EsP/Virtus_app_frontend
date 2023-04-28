import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { URLS } from "../urls";
import { Training } from "../Interfaces";
import { TrainingList } from "../Interfaces";
import { getAuthToken, useIsAuthJwt } from "../hooks/useIsAuthJwt";
type TrainingsResponse = {
  data: {
    trainings: TrainingList[];
  };
};
const http = {
  async get_trainings(): Promise<TrainingList[] | undefined> {
    try {
      const exercisesFetch = await axios.get<TrainingsResponse>(
        `${URLS.domain}/training/get_trainings`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        }
      );
      return exercisesFetch.data.data.trainings;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  },
};

export { http };
