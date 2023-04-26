import React from "react";
import { Exercise } from "../../../Interfaces";
export const RenderExerciseList = ({ exercises }: { exercises: any[] }) => {
  return (
    <ul>
      {exercises.map((exercise: Exercise, index: number) => (
        <li key={index}>
          <div>Nombre: {exercise.name}</div>
          <div>
            <iframe
              width="210"
              height="172.5"
              src={`https://www.youtube.com/embed/${
                exercise.video_link.split("v=")[1]
              }`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </li>
      ))}
    </ul>
  );
};
