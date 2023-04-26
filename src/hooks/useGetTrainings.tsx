import React, { useEffect, useState } from "react";
import { URLS } from "../urls";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { http } from "../services/http.training";
import { TrainingList } from "../Interfaces";

export const useGetTrainingsByTrainer = () => {
  const [trainings, setTrainings] = useState<TrainingList[]>([]);
  useEffect(() => {
    const GetTrainings = async () => {
      const allTrainings = await http.get_trainings();
      setTrainings(allTrainings ?? []);
    };
    GetTrainings();
  }, []);

  return { trainings };
};
