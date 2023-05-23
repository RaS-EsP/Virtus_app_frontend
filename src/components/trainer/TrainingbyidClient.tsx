import { useParams } from "react-router-dom";
import React from "react";
import { useGetAllTrainingsClient } from "./hooks/useGetAllTrainingsClient";
import { Training } from "../../Interfaces";
import { URLS } from "../../urls";
interface TraininingInfo {
  id: string;
  client_id: string;
  training_id: string;
  date: string;
  training: New_training;
}
interface New_training {
  id: string;
  trainer_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
export function TrainingbyidClient() {
  const { all_trainings_client } = useGetAllTrainingsClient();
  return (
    <div>
      {all_trainings_client.map((training: any) => (
        <ul key={training.id}>
          <a
            href={`${URLS.domain_client}/trainer/Schedule_training/${training.training_id}`}
          >
            {training.name}
          </a>

          <span style={{ marginLeft: 4 }}>{training.date}</span>
        </ul>
      ))}
    </div>
  );
}
