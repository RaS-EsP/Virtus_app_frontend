import React from "react";
import { getTrainingDetailsInterface } from "../../Interfaces";
import { useGetTrainingDetailsbyTrainingId } from "../../hooks/useGetTrainingDetailsbyTrainingId";
export const TrainingsDetailsView = () => {
  const { trainingsDetails } = useGetTrainingDetailsbyTrainingId();

  return (
    <div>
      <div>
        {trainingsDetails.map(
          (detail: getTrainingDetailsInterface, index: number) => (
            <ul key={index}>
              <li>name: {detail.exercise.name}</li>
              <li>description: {detail.exercise.description}</li>
              <li>sets: {detail.sets}</li>
              <li>reps: {detail.repetitions}</li>
              <li>rest: {detail.rest}</li>
              <li>rir: {detail.rir}</li>
              <li>weight: {detail.weight}</li>
              <li>
                <iframe
                  width="210"
                  height="172.5"
                  src={`https://www.youtube.com/embed/${
                    detail.exercise.video_link.split("v=")[1]
                  }`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </li>
            </ul>
          )
        )}
      </div>
    </div>
  );
};
