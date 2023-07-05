import axios from "axios";
import React from "react";
import { URLS } from "../../../../../urls";
import { getAuthToken } from "../../../hooks/useIsAuthJwt";
import { Exercise } from "../../../../../Interfaces";

export const useUpdateExercise = ({
  setExercises,
  setSuccessUpdateExercisemodalopen,
  closeModal,
  ExerciseValues,
}: any) => {
  async function ModifyExercise(ExerciseValues: any) {
    try {
      const response = await axios.put(
        `${URLS.domain}/exercise/update`,
        {
          ExerciseValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        }
      );
      setExercises((prevExercises: Exercise[]) =>
        prevExercises.map((exercise: Exercise) => {
          if (exercise.id === ExerciseValues.id) {
            return {
              ...exercise,
              ...ExerciseValues,
            };
          }
          return exercise;
        })
      );
      setSuccessUpdateExercisemodalopen(true);

      setTimeout(() => {
        setSuccessUpdateExercisemodalopen(false);
        closeModal(false);
      }, 2000);

      // Hacer algo con la respuesta exitosa
    } catch (error) {
      console.error(error);
      // Hacer algo con el error
    }
  }
  ModifyExercise(ExerciseValues);
};
