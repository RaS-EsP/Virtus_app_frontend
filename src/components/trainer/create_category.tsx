import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";

export const Create_category = (props: any) => {
  const { jwt, headers } = useContext(UserContext);

  const [inputForm, setInputForm] = useState({
    Name: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputForm.Name) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3050/category/create",
        { name: inputForm.Name },
        {
          headers: headers,
        }
      );

      alert("The category was sucessfully sent");
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={inputForm.Name}
          type="text"
          name="Name"
          placeholder="Name"
        />
        <button>Create category</button>
      </form>
    </div>
  );
};
