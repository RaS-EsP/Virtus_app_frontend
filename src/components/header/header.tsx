import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import { UserContext } from "../context/UserContext";
import { useIsAuthJwt } from "../../hooks/useIsAuthJwt";

export const Header = () => {
  const padding = {
    padding: 5,
  };

  const token = useIsAuthJwt();

  return (
    <header>
      <div className="header">
        <Link style={padding} to="/">
          home
        </Link>
        {token ? (
          <div>
            <Link style={padding} to="/trainer/clients">
              Clients
            </Link>

            <Link style={padding} to="/client_invitation">
              Client Invitation
            </Link>
            <Link style={padding} to="/trainer/create_training">
              Create training
            </Link>
            <Link style={padding} to="/trainer/trainings">
              Trainings
            </Link>
            <Link style={padding} to="trainer/create_exercise">
              Create Exercises
            </Link>
            <Link style={padding} to="/logout">
              Logout
            </Link>
            <Link style={padding} to="/client/scheduled_training">
              (Client)Scheduled training
            </Link>
            <Link style={padding} to="/trainer/asign_schedule_training">
              Asign Scheduled training
            </Link>
          </div>
        ) : (
          <div>
            <Link style={padding} to="/trainer/login">
              login
            </Link>
            <Link style={padding} to="/trainer/signup">
              signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
