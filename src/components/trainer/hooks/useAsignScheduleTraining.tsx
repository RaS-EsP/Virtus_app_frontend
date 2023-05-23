import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Client } from "../../../Interfaces";
import { getAuthToken } from "./useIsAuthJwt";
interface Fields {
  client?: string;
  training?: string;
  date?: any;
  [key: string]: any;
}
export const useAsignScheduleTraining = (fields: Fields) => {
  const PostFetch = async () => {
    try {
      const DateUtc = new Date(fields.date).toISOString();
      const ScheduleTraining = await axios.post(
        "http://localhost:3050/training/create_from_template",
        {
          client_id: fields.client,
          training_template_id: fields.training,
          date: DateUtc,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        }
      );
      alert("ejercicio asignado correctamente");
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err?.response?.data);
      return false;
    }
  };
  return PostFetch();
};
