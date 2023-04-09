import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import React from "react";
import { Login } from "./components/trainer/login";
import { Signup } from "./components/trainer/signup";
import { ErrorPage } from "./components/error_page/error-page";
import { Header } from "./components/header/header";
import { ClientsByTrainer } from "./components/trainer/clients";
import { Logout } from "./components/Logout";
import { CreatingHash } from "./components/trainer/creatingHash";
import { SignUpClient } from "./components/client/signup_client";
import { Login_client } from "./components/client/login_client";

export const App = () => {
  const token = window.localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/trainer/signup"
          element={token ? <Login /> : <Signup />}
        />
        <Route path="/trainer/login" element={token ? <Home /> : <Login />} />
        <Route
          path="/"
          element={token ? <Home /> : <Login />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/trainer/clients"
          element={<ClientsByTrainer token={token} />}
        />
        <Route
          path="client_invitation"
          element={<CreatingHash token={token} />}
        />
        <Route path="client/login" element={<Login_client />} />
        <Route path="client/signup/:code" element={<SignUpClient />} />
        <Route path="/logout" element={<Logout token={token} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};
