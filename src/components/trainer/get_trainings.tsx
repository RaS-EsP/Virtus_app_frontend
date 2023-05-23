import React, { useContext, useMemo, useState, useCallback } from "react";
import { useIsAuthJwt } from "./hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { useGetTrainingTemplatesByTrainer } from "./hooks/useGetTrainingTemplates";
import { TrainingList } from "../../Interfaces";
import { RenderTrainingList } from "./renders/RenderTrainingList";
export const TrainingsView = () => {
  const { trainings } = useGetTrainingTemplatesByTrainer();
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
