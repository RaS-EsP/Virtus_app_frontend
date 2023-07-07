import React, { useEffect } from "react";
import { Exercise } from "../../../../../Interfaces";

export const useFilterExercises = ({
  ListOfCategoriesToFilter,
  exercises,
  inputExercise,
  setFilteredExercises,
}: any) => {
  useEffect(() => {
    let result;
    if (ListOfCategoriesToFilter.length > 0) {
      result = exercises.filter(
        (ex: Exercise) =>
          ex.categories.some((cat) =>
            ListOfCategoriesToFilter.includes(cat.name)
          ) && ex.name.toLowerCase().includes(inputExercise.toLowerCase())
      );
    } else {
      result = exercises.filter((ex: Exercise) =>
        ex.name.toLowerCase().includes(inputExercise.toLowerCase())
      );
    }
    setFilteredExercises(result);
  }, [inputExercise, ListOfCategoriesToFilter]);
};
