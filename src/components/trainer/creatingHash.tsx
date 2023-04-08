import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

export const CreatingHash = (props: any) => {
  const [code, setCode] = useState("");
  if (!props.token) {
    return <Navigate to="/" />;
  }
  const creatingCodeRequest = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${props.token}`,
      };
      const codeRequest = await axios.post(
        "http://localhost:3050/hash/create",
        {},
        { headers: headers }
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
        {code == ""
          ? ""
          : `tu link es http://localhost:3000/client/signup/${code}`}
      </div>
      <button onClick={creatingCodeRequest}>Create a link for a client</button>
    </div>
  );
};
