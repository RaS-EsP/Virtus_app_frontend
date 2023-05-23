import React, { useContext } from "react";
import { useGetTrainingTemplatesByTrainer } from "./hooks/useGetTrainingTemplates";
import { useIsAuthJwt } from "./hooks/useIsAuthJwt";
import { Navigate } from "react-router-dom";
import { useGetClientsByTrainer } from "./hooks/useGetClientsByTrainer";
import { Client, TrainingList } from "../../Interfaces";
import { Training2 } from "../../Interfaces";
import { useAsignScheduleTraining } from "./hooks/useAsignScheduleTraining";

export function AsignScheduleTraining() {
  const { clients } = useGetClientsByTrainer();
  const { trainings } = useGetTrainingTemplatesByTrainer();

  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.currentTarget));
    if (fields.client == "" || fields.training == "" || fields.date == "") {
      return;
    }
    const result = await useAsignScheduleTraining(fields);
    if (!result) {
      ("There was a error creating the asignSchedule");
    }
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label>Client</label>

        <select name="client">
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

        <select name="training">
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
        <input name="date" type="date" min="2018-01-01"></input>
        <button style={{ marginTop: "5px" }}>Asign</button>
      </form>
    </div>
  );
}
