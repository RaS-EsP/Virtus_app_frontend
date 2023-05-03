import React, { useState } from "react";
import "../../styles/login.css";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const Login_client = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputForm.email || !inputForm.password) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3050/client/login", {
        email: inputForm.email,
        password: inputForm.password,
      });
      const token = response.data.data.access_token;
      const role = response.data.data.role;

      window.localStorage.setItem("token", token);
      window.localStorage.setItem("role", role);

      navigate("/");
      window.location.reload();
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
          value={inputForm.email}
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          onChange={handleChange}
          value={inputForm.password}
          type="password"
          name="password"
          placeholder="password"
        />
        <button>Login client</button>
      </form>
    </div>
  );
};
