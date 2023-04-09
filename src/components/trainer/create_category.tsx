import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const Create_category = (props: any) => {
  if (!props.token) {
    return <Navigate to="/" />;
  }
  const navigate = useNavigate();
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
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${props.token}`,
      };
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
