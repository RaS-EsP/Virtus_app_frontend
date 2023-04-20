import React, { useContext, useMemo, useEffect, useState } from "react";
import { Context } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { Navigate, useParams } from "react-router-dom";
import { useGetTrainingsDetailsByTraining } from "../../hooks/useGetTrainingDetail";
import { getTrainingDetailsInterface } from "./trainerInterface";
import { URLS } from "../../urls";
import axios, { AxiosError } from "axios";
export const TrainingsDetailsView = () => {
  const { jwt } = useContext(Context);
  const { id } = useParams();
  const [trainingsDetails, setTrainingsDetails] = useState([]);

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
  useEffect(() => {
    const getTrainingsDetails = async () => {
      try {
        const response = await axios.get(`${URLS.domain}/training_detail/get`, {
          params: { training_id: id },
          headers: headers,
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
    // <div>
    //   {trainingsDetails.map(
    //     (trainingDetail: getTrainingDetails, index: number) => (
    //       <li key={index}>{trainingDetail.exercise_id}</li>
    //     )
    //   )}
    <div>
      {/* <div>{JSON.stringify(trainingsDetails)}</div> */}

      <div>
        {trainingsDetails.map(
          (detail: getTrainingDetailsInterface, index: number) => (
            <ul key={index}>
              <li>{detail.exercise.name}</li>
              <li>{detail.exercise.description}</li>
              <li>{detail.sets}</li>
              <li>{detail.repetitions}</li>
              <li>{detail.rest}</li>
              <li>{detail.rir}</li>
              <li>{detail.weight}</li>
            </ul>
          )
        )}
      </div>
    </div>
  );
};
