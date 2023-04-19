import axios, { AxiosError } from "axios";
import React, { useState, useEffect, useContext, useMemo } from "react";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { URLS } from "../../urls";
import { useGetExercisesByTrainer } from "../../hooks/useGetExercises";
import "../../styles/create_exercises.css";
import { Training, Exercise, TrainingDetails } from "./trainerInterface";

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
  const [trainingDetails, setTrainingDetails] = useState<TrainingDetails>({
    trainingName: "",
    trainingDescription: "",
    exerciseDetails: [],
  });

  const handleChangeInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setTrainingDetails({
      trainingName: inputFormValueTraining.name,
      trainingDescription: inputFormValueTraining.description,
      exerciseDetails: ExercisesDetailTable.map(
        (exercise: Exercise, index) => ({
          exerciseId: exercise.id,
          sets: parseInt(
            (document.getElementById(`setsId${index}`) as HTMLInputElement)
              .value
          ),
          reps: parseInt(
            (document.getElementById(`repsId${index}`) as HTMLInputElement)
              .value
          ),
          rir: parseInt(
            (document.getElementById(`rirId${index}`) as HTMLInputElement).value
          ),
          rest: parseInt(
            (document.getElementById(`restId${index}`) as HTMLInputElement)
              .value
          ),
          weight: parseFloat(
            (document.getElementById(`weightId${index}`) as HTMLInputElement)
              .value
          ),
        })
      ),
    });
    try {
      const FetchCreateTrainingWithDetails = await axios.post(
        `${URLS.domain}/training/create_with_detail_views`,
        { trainingDetails },
        { headers: headers }
      );

      alert("Entrenamiento creado correctamente");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
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
      {JSON.stringify(trainingDetails)}
    </div>
  );
};
