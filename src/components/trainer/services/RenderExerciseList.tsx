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

type SetExercisesDetailTable = React.Dispatch<React.SetStateAction<Exercise[]>>;
export const RenderExercisesListWithButton = ({
  exercises,
  setExercisesDetailTable,
}: {
  exercises: any;
  setExercisesDetailTable: SetExercisesDetailTable;
}) => {
  return (
    <div className="containerExercises">
      {exercises.map((exercise: Exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <iframe
            width="210"
            height="172.5"
            src={`https://www.youtube.com/embed/${
              exercise.video_link.split("v=")[1]
            }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div>
            <button
              onClick={() => {
                setExercisesDetailTable((prevExercises: Exercise[]) => [
                  ...prevExercises,
                  exercise,
                ]);
              }}
            >
              Add Exercise
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
