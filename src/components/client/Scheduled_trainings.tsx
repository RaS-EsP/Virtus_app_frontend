import React, { useEffect, useState, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { URLS } from "../../urls";
import { Navigate } from "react-router-dom";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Scheduled_trainings } from "../../Interfaces";
import { getAuthToken } from "../../hooks/useIsAuthJwt";
export function ScheduledTrainings() {
  const [ScheduledTrainings, setScheduledTrainings] = useState<
    Scheduled_trainings[]
  >([]);
  useEffect(() => {
    const getScheduledTrainings = async () => {
      try {
        const responseScheduledTrainings = await axios.get(
          `${URLS.domain}/scheduled_training/get`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );
        setScheduledTrainings(
          responseScheduledTrainings.data.data.ScheduledTraining
        );
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    getScheduledTrainings();
  }, []);
  return (
    <div>
      {ScheduledTrainings.map(
        (scheduledtraining: Scheduled_trainings, index: number) => (
          <ul key={index}>
            <div>{scheduledtraining.training.name}</div>
            <div>{scheduledtraining.training.description}</div>
            <div>{scheduledtraining.date}</div>
          </ul>
        )
      )}
    </div>
  );
}
