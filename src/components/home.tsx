import React from "react";
import { getAuthRole, getAuthToken } from "./trainer/hooks/useIsAuthJwt";
import { Trainer_home } from "./trainer/trainer_home";
import { Client_home } from "./client/client_home";
export const Home = () => {
  const token = getAuthToken();
  const role = getAuthRole();
  return (
    <>
      {token ? (
        role == "trainer" ? (
          <Trainer_home />
        ) : (
          <Client_home />
        )
      ) : (
        <div>
          <div>
            Are you a trainer? <a href="/trainer/login">Login</a>
            <a href="/trainer/signup">Signup</a>
            Are you a client? <a href="/client/login">Login</a>
          </div>
        </div>
      )}
    </>
  );
};
