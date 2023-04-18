import axios, { AxiosError } from "axios";
import React, { useState, useEffect, useContext, useMemo } from "react";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { URLS } from "../../urls";
import { useGetExercisesByTrainer } from "../../hooks/useGetExercises";
import "../../styles/create_exercises.css";

interface Training {
  name: string;
  description: string;
}
interface Exercise {
  id: string;
  name: string;
  description: string;
  video_link: string;
  trainer_id: string;
}

// ...

export const Create_training = () => {
  const { jwt } = useContext(Context);

  try {
    if (!useIsAuthJwt(jwt)) {
      return <Navigate to={"/trainer/login"} />;
    }
  } catch (error) {
    console.log(error);
    return <Navigate to={"/trainer/login"} />;
  }
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    }),
    [jwt]
  );
  const { exercises } = useGetExercisesByTrainer(jwt, headers);
  if (!exercises) {
    return <div>Error fetching exercises</div>;
  }
  const [inputFormValueTraining, setInputFormValueTraining] =
    useState<Training>({
      name: "",
      description: "",
    });
  const [ExercisesDetailTable, setExercisesDetailTable] = useState<Exercise[]>(
    []
  );

  const handleChangeInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(URLS.domain);
    setInputFormValueTraining({
      ...inputFormValueTraining,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitTrainingForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!inputFormValueTraining.name || !inputFormValueTraining.description) {
      return;
    }
    try {
      const POSTtrainingInfo = await axios.post(
        `${URLS.domain}/training/create`,
        {
          name: inputFormValueTraining.name,
          description: inputFormValueTraining.description,
        },
        { headers: headers }
      );
      alert("Entrenamiento creado correctamente");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err?.response?.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitTrainingForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={inputFormValueTraining.name}
          onChange={handleChangeInputForm}
        />
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          value={inputFormValueTraining.description}
          onChange={handleChangeInputForm}
        />
        <button type="submit">Create training</button>

        {ExercisesDetailTable.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>RIR</th>
                <th>Rest</th>
              </tr>
              {ExercisesDetailTable.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.name}</td>
                  <td>
                    <input type="number" min={0} max={100} />
                  </td>
                  <td>
                    <input type="number" min={0} max={100} />
                  </td>
                  <td>
                    <input type="number" min={0} max={10} />
                  </td>
                  <td>
                    <input type="number" min={0} max={1000} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
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
        )}
      </form>
      <div className="containerExercises">
        {exercises.map((exercise: Exercise) => (
          <div key={exercise.id}>
            <h2>{exercise.name}</h2>
            <a href={exercise.video_link}>Video</a>
            <div>
              <button
                onClick={() => {
                  setExercisesDetailTable((prevExercises) => [
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
    </div>
  );
};
