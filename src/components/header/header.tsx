import React from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css";

export const Header = () => {
  const padding = {
    padding: 5,
  };
  const token = window.localStorage.getItem("token");

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
            <Link style={padding} to="/logout">
              Logout
            </Link>
            <Link style={padding} to="/client_invitation">
              Client Invitation
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
