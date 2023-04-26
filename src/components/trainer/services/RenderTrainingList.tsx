import React from "react";
import { TrainingList } from "../../../Interfaces";

export const RenderTrainingList = ({ trainings }: { trainings: any[] }) => {
  return (
    <div>
      {trainings.map((training: TrainingList, index: number) => (
        <a key={index} href={`training_details/${training.id}`}>
          <li>{training.name}</li>
        </a>
      ))}
    </div>
  );
};
