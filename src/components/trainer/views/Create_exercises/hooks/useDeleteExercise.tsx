import React from "react";
import { Exercise } from "../../../../../Interfaces";
import axios from "axios";
import { URLS } from "../../../../../urls";
import { getAuthToken } from "../../../hooks/useIsAuthJwt";

export const useDeleteExercise = ({
  ExerciseValues,
  setExercises,
  setSuccessDeletemodalopen,
  closeModal,
}: any) => {
  async function deleteExercise(exerciseId: string) {
    try {
      const response = await axios.delete(
        `${URLS.domain}/exercise/delete/${exerciseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        }
      );
      setExercises((prevExercises: Exercise[]) =>
        prevExercises.filter((exercise) => exercise.id !== ExerciseValues.id)
      );
      setSuccessDeletemodalopen(true);

      setTimeout(() => {
        setSuccessDeletemodalopen(false);
        closeModal((prevState: any) => !prevState);
      }, 2000);
      // Hacer algo con la respuesta exitosa
    } catch (error) {
      console.error(error);
      // Hacer algo con el error
    }
  }
  deleteExercise(ExerciseValues.id);
};
