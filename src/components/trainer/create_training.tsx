import React, { useState } from "react";

import { useGetExercisesByTrainer } from "./hooks/useGetExercises";
import "../../styles/create_exercises.css";
import {
  Training,
  Exercise,
  TrainingDetails,
  Category,
} from "../../Interfaces";
import {
  RenderEmptyTableWithoutExerciseDetails,
  RenderTableWithExerciseDetail,
} from "./renders/RenderTrainingCreate";
import { useCreateTrainingTemplate } from "./hooks/useCreateTraining";
import { RenderExercisesListWithButton } from "./renders/RenderExerciseList";
import { useGetCategories } from "./hooks/useGetCategories";
export const Create_training = () => {
  const { exercises } = useGetExercisesByTrainer();
  const { categories } = useGetCategories();
  const [filteredExercises, setFilteredExercises] =
    useState<Exercise[]>(exercises);
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
  const [filters, setFilterValue] = useState({
    NameSearch: "",
    CategorySearch: "",
  });
  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilterValue({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
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
          exercise_id: exercise.id,
          sets: parseInt(
            (document.getElementById(`setsId${index}`) as HTMLInputElement)
              .value
          ),
          repetitions: parseInt(
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

  const filterExercises = exercises.filter((exercise: Exercise) => {
    if (filters.CategorySearch == "") {
      return exercise.name
        .toLowerCase()
        .includes(filters.NameSearch.toLowerCase());
    } else if (filters.NameSearch == "") {
      return exercise.categories
        .map((c) => c.name.toLowerCase())
        .includes(filters.CategorySearch.toLowerCase());
    } else {
      console.log("hay ambas");

      return (
        exercise.categories
          .map((c) => c.name.toLowerCase())
          .includes(filters.CategorySearch.toLowerCase()) &&
        exercise.name.toLowerCase().includes(filters.NameSearch.toLowerCase())
      );
    }
  });

  useCreateTrainingTemplate(trainingDetails);

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
      <input
        name="NameSearch"
        type="text"
        onChange={handleChangeFilter}
      ></input>
      {/* <input
        name="CategorySearch"
        type="text"
        onChange={handleChangeFilter}
      ></input> */}

      <select name="CategorySearch" onChange={handleChangeFilter}>
        <option value="" disabled selected hidden>
          Choose a category
        </option>
        {categories.map((category: Category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <RenderExercisesListWithButton
        exercises={filterExercises.length > 0 ? filterExercises : exercises}
        setExercisesDetailTable={setExercisesDetailTable}
      />
    </div>
  );
};
