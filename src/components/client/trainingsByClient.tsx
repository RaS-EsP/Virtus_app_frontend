import React, { useEffect, useState, useMemo } from "react";

import { URLS } from "../../urls";

import { UseGetTrainingsByClientId } from "./hooks/UseGetTrainingsByClientId";

export function TrainingListByClient() {
  const { TrainingsList } = UseGetTrainingsByClientId();

  return (
    <div>
      {TrainingsList.map((training: any, index: number) => (
        <ul key={index}>
          <div>
            <a href={`${URLS.domain_client}/client/workout/${training.id}`}>
              {training.name}
            </a>
          </div>
          <div>{training.description}</div>
          <div>{training.date}</div>
        </ul>
      ))}
    </div>
  );
}
