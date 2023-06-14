import React from "react";
import { Link } from "react-router-dom";
export const TokenAndClient = () => {
  return (
    <>
      <a
        className="hover:bg-ThirdColor hover:text-FirstColor md:hover:bg-FirstColor md:hover:text-FourthColor w-full md:w-fit "
        href="/client/scheduled_training"
      >
        Scheduled training
      </a>
    </>
  );
};
