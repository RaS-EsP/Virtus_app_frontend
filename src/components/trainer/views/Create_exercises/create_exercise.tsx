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
  const [inputExercise, setinputExercise] = useState("");

  const { categories, IsCategoriesLoaded } = useGetCategories();
  const { exercises, AreExercisesLoaded, setExercises } =
    useGetExercisesByTrainer();
  const [selected, setSelected] = useState("");
  const [ListOfFilteredCategories, SetListOfFilteredCategories] = useState<any>(
    []
  );
  const [ListOfFilteredAddCategories, SetListOfFilteredAddCategories] =
    useState<any>([]);
  const [inputForm, setInputForm] = useState({
    name: "",
    video_link: "",
    description: "",
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
    if (!inputForm.name || !inputForm.video_link || !inputForm.description) {
      return;
    }
    if (ListOfFilteredAddCategories.length == 0) {
      alert("You must select at least one category");
      return;
    }
    const CategoriesList = [];
    for (let i = 0; i < ListOfFilteredAddCategories.length; i++) {
      CategoriesList.push(ListOfFilteredAddCategories[i].id);
    }
    try {
      const SubmitResponse = await axios.post(
        `${URLS.domain}/exercise/create_exercise`,
        {
          name: inputForm.name,
          video_link: inputForm.video_link,
          description: inputForm.description,
          categories: CategoriesList,
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
      });
      SetListOfFilteredAddCategories([]);
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
  const filterExercises = (searchValue: string) => {
    let result;
    if (ListOfFilteredCategories.length > 0) {
      result = exercises.filter(
        (ex) =>
          ex.categories.some((cat) =>
            ListOfFilteredCategories.includes(cat.name)
          ) && ex.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      result = exercises.filter((ex) =>
        ex.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setFilteredExercises(result);
  };

  useEffect(() => {
    filterExercises(inputExercise);
  }, [filterExercises, ListOfFilteredCategories]);

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
            categories={categories}
            ListOfFilteredAddCategories={ListOfFilteredAddCategories}
            SetListOfFilteredAddCategories={SetListOfFilteredAddCategories}
          />

          <RenderExerciseList
            inputExercise={inputExercise}
            setinputExercise={setinputExercise}
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
