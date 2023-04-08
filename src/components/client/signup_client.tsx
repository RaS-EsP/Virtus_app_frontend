import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../error_page/error-page";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpClient = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [codeExists, setCodeExists] = useState(false);
  const [apiCompleted, setApiCompleted] = useState(false);
  const [trainerInfoState, setTrainerInfoState] = useState({
    trainer_id: "",
    trainer: "",
  });
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
        "http://localhost:3050/client/sign-up",
        {
          name: inputFormSignUp.name,
          last_name: inputFormSignUp.last_name,
          email: inputFormSignUp.email,
          username: inputFormSignUp.username,
          password: inputFormSignUp.password,
          trainer_id: trainerInfoState.trainer_id,
        }
      );
      const deleteHash = await axios.delete(
        "http://localhost:3050/hash/delete",
        {
          data: {
            code: code,
          },
        }
      );

      navigate("/trainer/login");
      window.location.reload();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    const getTrainer = async () => {
      try {
        const trainerInfo = await axios.post(
          "http://localhost:3050/hash/get_trainer",
          {
            code: code,
          }
        );

        setCodeExists(true);
        const trainerData = trainerInfo.data.data;
        setTrainerInfoState({
          trainer_id: trainerData.trainer_id,
          trainer: trainerData.trainer,
        });
      } catch (error) {
        setCodeExists(false);
        const err = error as AxiosError;
        console.log(err.response?.data);
      } finally {
        setApiCompleted(true);
      }
    };
    getTrainer();
  }, [code]);

  if (!apiCompleted) {
    return null; // renderizado mientras se realiza la solicitud a la API
  }

  return codeExists ? (
    <div>
      <p>Formulario invitado por {trainerInfoState.trainer}</p>
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
    </div>
  ) : (
    <ErrorPage />
  );
};
