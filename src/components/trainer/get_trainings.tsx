import React, { useContext, useMemo, useState, useCallback } from "react";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { useGetTrainingsByTrainer } from "../../hooks/useGetTrainings";
import { TrainingList } from "./trainerInterface";
import { RenderTrainingList } from "./services/RenderTrainingList";
export const TrainingsView = () => {
  const { jwt } = useContext(Context);
  const [inputSearchValue, SetInputSearchValue] = useState("");
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
  const [trainingsListFiltered, setTrainingListFiltered] = useState<
    TrainingList[]
  >([]);
  const filterTraining = useCallback(
    (searchValue: string) => {
      const filtered = trainings.filter((training: TrainingList) => {
        const name = training.name.toLowerCase();
        const search = searchValue.toLowerCase();
        return name.includes(search);
      });
      setTrainingListFiltered(filtered);
    },
    [trainings]
  );
  return (
    <div>
      <div>
        <button>
          <a href="http://localhost:3000/trainer/create_training">
            CREATE TRAINING
          </a>
        </button>
      </div>
      <input
        type="text"
        name="filter"
        onChange={(e) => filterTraining(e.target.value)}
      ></input>

      <RenderTrainingList
        trainings={
          trainingsListFiltered.length > 0 ? trainingsListFiltered : trainings
        }
      />
    </div>
  );
};