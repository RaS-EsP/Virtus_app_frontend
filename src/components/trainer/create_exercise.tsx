import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner";

export const Create_Exercise = (props: any) => {
  const [spinnerState, setSpinnerState] = useState(false);
  if (!props.token) {
    return <Navigate to="/login" />;
  }
  const [inputForm, setInputForm] = useState({
    name: "",
    video_link: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
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
        setSpinnerState(true);
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
    if (!inputForm.name || !inputForm.video_link || !inputForm.description) {
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
      {spinnerState ? (
        categories.length === 0 ? (
          <form onSubmit={HandleSubmitForm}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={inputForm.name}
              onChange={handleChangeForm}
              name="name"
              id="name"
            />
            <label htmlFor="video_link">Video Link:</label>
            <input
              type="text"
              value={inputForm.video_link}
              onChange={handleChangeForm}
              name="video_link"
              id="video_link"
            />
            <label htmlFor="description">Description:</label>
            <textarea
              value={inputForm.description}
              onChange={handleChangeForm}
              name="description"
              id="description"
            />
            <label htmlFor="categories">Category:</label>
            <div>There is not categories</div>

            <button type="submit">Create Exercise</button>
          </form>
        ) : (
          <form onSubmit={HandleSubmitForm}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={inputForm.name}
              onChange={handleChangeForm}
              name="name"
              id="name"
            />
            <label htmlFor="video_link">Video Link:</label>
            <input
              type="text"
              value={inputForm.video_link}
              onChange={handleChangeForm}
              name="video_link"
              id="video_link"
            />
            <label htmlFor="description">Description:</label>
            <textarea
              value={inputForm.description}
              onChange={handleChangeForm}
              name="description"
              id="description"
            />
            <label htmlFor="categories">Category:</label>
            <select
              name="category"
              id="categories"
              value={inputForm.category}
              onChange={handleChangeForm}
            >
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button type="submit">Create Exercise</button>
          </form>
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

/////
