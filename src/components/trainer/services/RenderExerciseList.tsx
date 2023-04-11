import React from "react";

export const RenderExerciseList = ({ exercises }: { exercises: any[] }) => {
  return (
    <ul>
      {exercises.map((exercise: any) => (
        <li key={exercise._id}>
          <div>Nombre: {exercise.name}</div>
          <div>Link del video: {exercise.video_link}</div>
        </li>
      ))}
    </ul>
  );
};
