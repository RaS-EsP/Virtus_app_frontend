import React, { useContext } from "react";
import { useGetTrainingsByTrainer } from "../../hooks/useGetTrainings";
import { UserContext } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { useGetClientsByTrainer } from "../../hooks/useGetClientsByTrainer";
import { Client, TrainingList } from "../../Interfaces";
import { Training2 } from "../../Interfaces";
export function AsignScheduleTraining() {
  const { jwt, headers } = useContext(UserContext);

  const { clients } = useGetClientsByTrainer(jwt, headers);
  const { trainings } = useGetTrainingsByTrainer();

  return (
    <div>
      <form>
        <label>Client</label>
        <select>
          <option value="" disabled selected hidden>
            Choose a client
          </option>
          {clients.map((client: Client, index: number) => (
            <option key={index} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <label>Training</label>

        <select>
          <option value="" disabled selected hidden>
            Choose a training
          </option>
          {trainings.map((training: TrainingList, index: number) => (
            <option key={index} value={training.id}>
              {training.name}
            </option>
          ))}
        </select>
        <label>Date</label>
        <input type="date" min="2018-01-01"></input>
      </form>
    </div>
  );
}
