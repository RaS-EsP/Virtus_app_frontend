import React, { useContext, useMemo } from "react";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { useGetTrainingsByTrainer } from "../../hooks/useGetTrainings";
import { TrainingList } from "./trainerInterface";
export const TrainingsView = () => {
  const { jwt } = useContext(Context);

  try {
    if (!useIsAuthJwt(jwt)) {
      return <Navigate to={"/trainer/login"} />;
    }
  } catch (error) {
    console.log(error);
    return <Navigate to={"/trainer/login"} />;
  }
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    }),
    [jwt]
  );
  const { trainings } = useGetTrainingsByTrainer(jwt, headers);
  return (
    <div>
      {trainings.map((training: TrainingList, index: number) => (
        <a key={index} href={`training_details/${training.id}`}>
          <li>{training.name}</li>
        </a>
      ))}
    </div>
  );
};
