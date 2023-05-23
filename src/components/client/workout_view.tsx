import React, { useState, useEffect } from "react";
import { URLS } from "../../urls";
import { getAuthToken } from "../trainer/hooks/useIsAuthJwt";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { Exercise } from "../../Interfaces";
export interface TrainingInfo {
  id: string;
  training_id: string;
  template_id: string;
  exercise_id: string;
  sets: number;
  repetitions: number;
  rest: number;
  rir: number;
  weight: number;
  is_template: boolean;
  exercise: Exercise;
}
const useGetTrainingInfoByTrainingId = (training_id: string) => {
  const [TrainingInfo, setTrainingInfo] = useState<[]>([]);
  useEffect(() => {
    const getTrainingInfo = async () => {
      try {
        const responseTrainingInfo = await axios.get(
          `${URLS.domain}/training/get_one`,

          {
            params: {
              id: training_id,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );

        setTrainingInfo(
          responseTrainingInfo.data.data.trainings.training_details
        );
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    getTrainingInfo();
  }, []);

  return { TrainingInfo };
};

export const WorkoutView = () => {
  const { training_id }: any = useParams();
  const { TrainingInfo } = useGetTrainingInfoByTrainingId(training_id);
  return (
    <div>
      <div>
        {TrainingInfo.map((training: TrainingInfo, index: number) => (
          <ul key={index}>
            <li>{training.exercise.name}</li>
            <li>{training.sets}</li>
            <li>{training.repetitions}</li>
            <li>{training.rest}</li>
            <li>{training.rir}</li>
            <li>{training.weight}</li>
            <li>{training.exercise.video_link}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
