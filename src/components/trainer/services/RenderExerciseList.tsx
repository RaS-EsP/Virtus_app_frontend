import React from "react";

export const RenderExerciseList = ({ exercises }: { exercises: any[] }) => {
  return (
    <ul>
      {exercises.map((exercise: any) => (
        <li key={exercise._id}>
          <div>Nombre: {exercise.name}</div>
          <div>
            <a
              href={exercise.video_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver video
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};
