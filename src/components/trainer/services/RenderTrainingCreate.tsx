import React from "react";
import { Exercise } from "../trainerInterface";
import { Props } from "../trainerInterface";
export const RenderTableWithExerciseDetail = ({
  ExercisesDetailTable,
}: Props) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>RIR</th>
          <th>Rest</th>
        </tr>
        {ExercisesDetailTable.map((exercise: Exercise, index: number) => (
          <tr key={index}>
            <td>{exercise.name}</td>
            <td>
              <input
                id={`setsId${index}`}
                type="number"
                defaultValue={4}
                min={0}
                max={100}
              />
            </td>
            <td>
              <input
                id={`repsId${index}`}
                type="number"
                defaultValue={12}
                min={0}
                max={100}
              />
            </td>
            <td>
              <input
                id={`rirId${index}`}
                type="number"
                defaultValue={0}
                min={0}
                max={10}
              />
            </td>

            <td>
              <input
                id={`restId${index}`}
                type="number"
                defaultValue={60}
                min={0}
                max={1000}
              />
            </td>
            <td>
              <input
                id={`weightId${index}`}
                type="number"
                defaultValue={0}
                step={".01"}
                min={0}
                max={1000}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const RenderEmptyTableWithoutExerciseDetails = () => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>RIR</th>
            <th>Rest</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
