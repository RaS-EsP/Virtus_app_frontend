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
import { Create_category } from "./components/trainer/create_category";
import { Create_Exercise } from "./components/trainer/create_exercise";
import { UserContextPROVIDER } from "./components/context/UserContext";
import { Create_training } from "./components/trainer/create_training";

export const App = () => {
  return (
    <UserContextPROVIDER>
      <Router>
        <Header />
        <Routes>
          <Route path="/trainer/signup" element={<Signup />} />
          <Route path="/trainer/login" element={<Login />} />
          <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
          <Route path="trainer/create_category" element={<Create_category />} />
          <Route path="/trainer/clients" element={<ClientsByTrainer />} />
          <Route path="trainer/create_exercise" element={<Create_Exercise />} />
          <Route path="trainer/create_training" element={<Create_training />} />
          <Route path="client_invitation" element={<CreatingHash />} />

          <Route path="client/login" element={<Login_client />} />
          <Route path="client/signup/:code" element={<SignUpClient />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserContextPROVIDER>
  );
};
