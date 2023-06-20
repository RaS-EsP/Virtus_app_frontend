import React from "react";
import { Link } from "react-router-dom";

export const TokenAndTrainerNav = () => {
  return (
    <>
      <a
        className="hover:bg-ThirdColor hover:text-FirstColor md:hover:bg-FirstColor md:hover:text-FourthColor w-full md:w-fit "
        href="/trainer/clients"
      >
        Clients
      </a>
      <a
        className="hover:bg-ThirdColor hover:text-FirstColor md:hover:bg-FirstColor md:hover:text-FourthColor w-full md:w-fit "
        href="/trainer/create_training"
      >
        Create training
      </a>
      <a
        className="hover:bg-ThirdColor hover:text-FirstColor md:hover:bg-FirstColor md:hover:text-FourthColor w-full md:w-fit "
        href="/trainer/trainings"
      >
        Trainings
      </a>
      <a
        className="hover:bg-ThirdColor hover:text-FirstColor md:hover:bg-FirstColor md:hover:text-FourthColor w-full md:w-fit "
        href="/trainer/create_exercise"
      >
        Create Exercises
      </a>
      <a
        className="hover:bg-ThirdColor hover:text-FirstColor md:hover:bg-FirstColor md:hover:text-FourthColor w-full md:w-fit "
        href="/trainer/asign_schedule_training"
      >
        Asign Scheduled training
      </a>
    </>
  );
};
