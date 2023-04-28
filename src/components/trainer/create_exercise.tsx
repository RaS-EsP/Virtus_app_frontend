import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { RenderExerciseCreateForm } from "./services/RenderExerciseCreateForm";
import { RenderExerciseList } from "./services/RenderExerciseList";
import { UserContext } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { URLS } from "../../urls";
import { Exercise } from "../../Interfaces";
import { getAuthToken } from "../../hooks/useIsAuthJwt";

export const Create_Exercise = () => {
  const [renderFormState, setFormState] = useState(false);
  const [renderExerciseState, setExerciseState] = useState(false);
  const [categories, setCategories] = useState([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState<Exercise | null>(null);

  const [inputForm, setInputForm] = useState({
    name: "",
    video_link: "",
    description: "",
    category: "",
  });
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const GetExercises = async () => {
      try {
        const exercisesFetch = await axios.get(
          `${URLS.domain}/exercise/getmany`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );

        setExercises(exercisesFetch.data.data.exercises);
        setExerciseState(true);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    GetExercises();
  }, [newExercise]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories_fetch = await axios.get(
          "http://localhost:3050/category/get_categories",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );

        setCategories(categories_fetch.data.data.Categories);
        setFormState(true);
        true;
      } catch (error) {
        const err = error as AxiosError;
        console.log(err?.response?.data);
      }
    };
    getCategories();
  }, []);

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
        "http://localhost:3050/exercise/create_exercise",
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
      alert("ejercicios creado correctamente");
      setNewExercise(SubmitResponse.data.data.exercise);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err?.response?.data);
    }
  };
  const filterExercises = useCallback(
    (searchValue: string) => {
      const filtered = exercises.filter((exercise) => {
        const name = exercise.name.toLowerCase();
        const search = searchValue.toLowerCase();
        return name.includes(search);
      });
      setFilteredExercises(filtered);
    },
    [exercises]
  );
  return (
    <div>
      {renderFormState && renderExerciseState ? (
        categories.length === 0 ? (
          <div>
            <RenderExerciseCreateForm
              inputForm={inputForm}
              handleChangeForm={handleChangeForm}
              categories={categories}
              HandleSubmitForm={HandleSubmitForm}
            />
            <div>First, create categories for your exercises</div>
          </div>
        ) : (
          <div>
            <RenderExerciseCreateForm
              inputForm={inputForm}
              handleChangeForm={handleChangeForm}
              categories={categories}
              HandleSubmitForm={HandleSubmitForm}
            />
            <div>
              <input
                type="text"
                name="filter"
                onChange={(e) => filterExercises(e.target.value)}
              ></input>
            </div>
            <RenderExerciseList
              exercises={
                filteredExercises.length > 0 ? filteredExercises : exercises
              }
            />
          </div>
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

/////
