import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const [inputFormSignUp, setInputFormSignUp] = useState({
    name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFormSignUp({
      ...inputFormSignUp,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputFormSignUp.email ||
      !inputFormSignUp.name ||
      !inputFormSignUp.last_name ||
      !inputFormSignUp.username ||
      !inputFormSignUp.password
    ) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3050/trainer/sign-up",
        {
          name: inputFormSignUp.name,
          last_name: inputFormSignUp.last_name,
          email: inputFormSignUp.email,
          username: inputFormSignUp.username,
          password: inputFormSignUp.password,
        }
      );

      navigate("/trainer/login");
      window.location.reload();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitSignUp}>
        <input
          onChange={handleChangeSignUp}
          value={inputFormSignUp.name}
          type="text"
          name="name"
          placeholder="name"
        />
        <input
          onChange={handleChangeSignUp}
          value={inputFormSignUp.last_name}
          type="text"
          name="last_name"
          placeholder="last name"
        />
        <input
          onChange={handleChangeSignUp}
          value={inputFormSignUp.email}
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          onChange={handleChangeSignUp}
          value={inputFormSignUp.username}
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          onChange={handleChangeSignUp}
          value={inputFormSignUp.password}
          type="password"
          name="password"
          placeholder="password"
        />
        <button>Sign up</button>
      </form>
    </div>
  );
};
