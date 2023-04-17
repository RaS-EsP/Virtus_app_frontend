import React, { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { RenderExerciseCreateForm } from "./services/RenderExerciseCreateForm";
import { RenderExerciseList } from "./services/RenderExerciseList";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
type Exercise = {
  id: number;
  name: string;
  category: string;
  description: string;
};

export const Create_Exercise = () => {
  const { jwt } = useContext(Context);

  if (!useIsAuthJwt(jwt)) {
    return <Navigate to={"/trainer/login"} />;
  }
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${jwt}`,
  };

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
      console.log("hola");
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `bearer ${jwt}`,
        };
        const exercisesFetch = await axios.get(
          "http://localhost:3050/exercise/getmany",
          { headers: headers }
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
            headers: headers,
          }
        );

        setCategories(categories_fetch.data.data.Categories);
        setFormState(true);
        true;
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
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
        { headers: headers }
      );
      alert("ejercicios creado correctamente");
      setNewExercise(SubmitResponse.data.data.exercise);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };
  const filterExercises = (searchValue: string) => {
    const filtered = exercises.filter((exercise) => {
      const name = exercise.name.toLowerCase();
      const search = searchValue.toLowerCase();
      return name.includes(search);
    });
    setFilteredExercises(filtered);
  };

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
            <div>There are no categories available</div>
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
