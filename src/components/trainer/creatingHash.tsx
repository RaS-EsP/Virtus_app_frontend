import React, { useState, useContext } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";
import { getAuthToken } from "../../hooks/useIsAuthJwt";
export const CreatingHash = () => {
  const [code, setCode] = useState("");

  const creatingCodeRequest = async () => {
    try {
      const codeRequest = await axios.post(
        "http://localhost:3050/hash/create",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        }
      );
      setCode(codeRequest.data.data.code);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <div>
        {code == "" ? (
          <button onClick={creatingCodeRequest}>
            Create a link for a client
          </button>
        ) : (
          `tu link es http://localhost:3000/client/signup/${code}`
        )}
      </div>
    </div>
  );
};
