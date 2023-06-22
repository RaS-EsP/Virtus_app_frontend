import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { getAuthToken } from "../../../hooks/useIsAuthJwt";
import useClipboard from "react-use-clipboard";
export const CreatingHashForClient = () => {
  const [code, setCode] = useState("");
  const [isCopied, setCopied] = useClipboard(
    `http://localhost:3000/client/signup/${code}`
  );
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
    <>
      <div className="flex justify-center  text-2xl font-bold uppercase border-b-2">
        INVITE TO YOUR NEW CLIENT
      </div>

      <div className="flex justify-center items-center mt-2 md:mt-10 ">
        {code === "" ? (
          <button
            className="bg-FirstColor text-white rounded-3xl mt-10 px-4 py-2 hover:bg-SecondColor"
            onClick={creatingCodeRequest}
          >
            Create a link for a client
          </button>
        ) : (
          <div className="flex flex-col">
            Share this link with your client in order to sign up in the
            platform:
            <span className="font-bold mt-2">
              <input
                className="w-full box-border border-FirstColor border-2 p-1"
                type="text"
                value={`http://localhost:3000/client/signup/${code}`}
                readOnly
              ></input>
            </span>
            {isCopied ? (
              <div className="text-lg text-gray-400 text-center md:mt-10 mt-2 px-4 py-2 ">
                ✔️Your link has been copied successfully✔️
              </div>
            ) : (
              <button
                className="bg-FirstColor flex justify-center mt-2   md:mt-10 g-FirstColor text-white rounded-3xl px-4 py-2 hover:bg-SecondColor "
                onClick={setCopied}
              >
                Click me to copy the link
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
