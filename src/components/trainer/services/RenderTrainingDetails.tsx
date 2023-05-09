import React from "react";

interface TrainingDetails {
  id: string;
  sets: number;
  repetitions: number;
  rest: number;
  rir: number;
  weight: number;
  exercise: {
    name: string;
    description: string;
    video_link: string;
  };
}

export const RenderTrainingDetails = ({
  trainingsDetails,
}: {
  trainingsDetails: TrainingDetails[];
}) => {
  return (
    <div>
      <div>
        {trainingsDetails.map((Detail: any, index: number) => (
          <ul key={index}>
            <li>{Detail.exercise.name}</li>
            <li>{Detail.sets}</li>
            <li>{Detail.repetitions}</li>
            <li>{Detail.rest}</li>
            <li>{Detail.rir}</li>
            <li>{Detail.weight}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
