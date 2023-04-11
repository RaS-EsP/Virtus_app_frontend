import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";
import { RenderExerciseCreateForm } from "./services/RenderExerciseCreateForm";
import { Header } from "../header/header";
import { RenderExerciseList } from "./services/RenderExerciseList";

export const Create_Exercise = (props: any) => {
  const [renderFormState, setFormState] = useState(false);
  const [renderExerciseState, setExerciseState] = useState(false);
  const [categories, setCategories] = useState([]);
  const [exercises, setExercises] = useState([]);
  if (!props.token) {
    return <Navigate to="/login" />;
  }
  const [inputForm, setInputForm] = useState({
    name: "",
    video_link: "",
    description: "",
    category: "",
  });
  useEffect(() => {
    const GetExercises = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `bearer ${props.token}`,
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
  }, [exercises]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `bearer ${props.token}`,
        };
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
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${props.token}`,
      };
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
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
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
            <RenderExerciseList exercises={exercises} />
          </div>
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

/////
