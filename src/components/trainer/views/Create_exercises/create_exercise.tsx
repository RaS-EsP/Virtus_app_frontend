import React, { useState, useCallback, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { LoadingSpinner } from "../../../LoadingSpinner";
import { RenderExerciseCreateForm } from "./components/RenderExerciseCreateForm";
import { RenderExerciseList } from "./components/RenderExerciseList";
import { URLS } from "../../../../urls";
import { Exercise } from "../../../../Interfaces";
import { getAuthToken } from "../../hooks/useIsAuthJwt";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useGetExercisesByTrainer } from "../../hooks/useGetExercises";

import { Successmodal } from "./components/SucessModal";
import { Transition } from "@headlessui/react";
import { transitionClases } from "../../../../transitions/transitions";

export const Create_Exercise = () => {
  const { categories, IsCategoriesLoaded } = useGetCategories();
  const { exercises, AreExercisesLoaded, setExercises } =
    useGetExercisesByTrainer();
  const [selected, setSelected] = useState("");
  const [ListOfFilteredCategories, SetListOfFilteredCategories] = useState<any>(
    []
  );
  const [inputForm, setInputForm] = useState({
    name: "",
    video_link: "",
    description: "",
    category: "",
  });
  const [Successmodalopen, setSucessModalOpen] = useState(false);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  const handleChangeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };

  const HandleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputForm.name ||
      !inputForm.video_link ||
      !inputForm.description ||
      !inputForm.category
    ) {
      return;
    }

    try {
      const SubmitResponse = await axios.post(
        `${URLS.domain}/exercise/create_exercise`,
        {
          name: inputForm.name,
          video_link: inputForm.video_link,
          description: inputForm.description,
          categories: [inputForm.category],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        }
      );
      setSucessModalOpen(true);
      setTimeout(() => setSucessModalOpen(false), 2000);
      setInputForm({
        name: "",
        video_link: "",
        description: "",
        category: "",
      });
      setSelected("");
      setExercises((prevExercises) => [
        ...prevExercises,
        SubmitResponse.data.data.exercise,
      ]);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err?.response?.data);
    }
  };
  const filterExercises = useCallback(
    (searchValue: string) => {
      const filtered = exercises.filter((exercise: Exercise) => {
        const name = exercise.name.toLowerCase();
        const search = searchValue.toLowerCase();
        return name.includes(search);
      });
      setFilteredExercises(filtered);
    },
    [exercises]
  );

  return (
    <>
      {IsCategoriesLoaded && AreExercisesLoaded ? (
        <div>
          <Transition show={Successmodalopen} {...transitionClases.opacity2}>
            <Successmodal />
          </Transition>

          <RenderExerciseCreateForm
            inputForm={inputForm}
            handleChangeForm={handleChangeForm}
            HandleSubmitForm={HandleSubmitForm}
            setInputForm={setInputForm}
            setSelected={setSelected}
            selected={selected}
          />

          <RenderExerciseList
            exercises={
              filteredExercises.length > 0 ? filteredExercises : exercises
            }
            filterExercises={filterExercises}
            categories={categories}
            SetListOfFilteredCategories={SetListOfFilteredCategories}
            ListOfFilteredCategories={ListOfFilteredCategories}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

