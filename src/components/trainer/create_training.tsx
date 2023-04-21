import axios, { AxiosError } from "axios";
import React, { useState, useEffect, useContext, useMemo } from "react";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { URLS } from "../../urls";
import { useGetExercisesByTrainer } from "../../hooks/useGetExercises";
import "../../styles/create_exercises.css";
import { Training, Exercise, TrainingDetails } from "./trainerInterface";
import {
  RenderEmptyTableWithoutExerciseDetails,
  RenderTableWithExerciseDetail,
} from "./services/RenderTrainingCreate";

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
  };
  useEffect(() => {
    if (
      !trainingDetails.trainingName ||
      !trainingDetails.trainingDescription ||
      trainingDetails.exerciseDetails.length === 0
    ) {
      return console.log("no hay data");
    }
    const createTraining = async () => {
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
    createTraining();
  }, [trainingDetails]);

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
          <RenderTableWithExerciseDetail
            ExercisesDetailTable={ExercisesDetailTable}
          />
        ) : (
          <RenderEmptyTableWithoutExerciseDetails />
        )}
      </form>
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
