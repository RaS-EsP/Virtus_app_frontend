import React, { useContext, useMemo, useEffect, useState } from "react";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate, useParams } from "react-router-dom";
import { useGetTrainingsDetailsByTraining } from "../../hooks/useGetTrainingDetail";
import { getTrainingDetailsInterface } from "../../Interfaces";
import { URLS } from "../../urls";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "../../hooks/useIsAuthJwt";

export const TrainingsDetailsView = () => {
  const { id } = useParams();
  const [trainingsDetails, setTrainingsDetails] = useState([]);

  useEffect(() => {
    const getTrainingsDetails = async () => {
      try {
        const response = await axios.get(`${URLS.domain}/training_detail/get`, {
          params: { training_id: id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        });
        setTrainingsDetails(response.data.data.training_details);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };

    getTrainingsDetails();
  }, []);

  return (
    <div>
      <div>
        {trainingsDetails.map(
          (detail: getTrainingDetailsInterface, index: number) => (
            <ul key={index}>
              <li>name: {detail.exercise.name}</li>
              <li>description: {detail.exercise.description}</li>
              <li>sets: {detail.sets}</li>
              <li>reps: {detail.repetitions}</li>
              <li>rest: {detail.rest}</li>
              <li>rir: {detail.rir}</li>
              <li>weight: {detail.weight}</li>
              <li>
                <iframe
                  width="210"
                  height="172.5"
                  src={`https://www.youtube.com/embed/${
                    detail.exercise.video_link.split("v=")[1]
                  }`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </li>
            </ul>
          )
        )}
      </div>
    </div>
  );
};
