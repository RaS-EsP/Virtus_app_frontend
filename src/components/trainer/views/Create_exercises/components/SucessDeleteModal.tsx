import React from "react";
import { CloseNavButton } from "../../../../header/NavButtons";
import SuccessLogo from "../../../../../img/gif/successGif.gif";

export const SuccessDeletemodal = () => {
  return (
    <div className="fixed inset-0 z-20 bg-gray-950 bg-opacity-50 backdrop-blur-sm flex items-center justify-center ">
      <div className="m-5 flex flex-col items-center justify-center bg-white drop-shadow-lg max-w-5xl max-h-96 rounded-3xl  overflow-hidden">
        <h2 className="mt-2 text-center mx-2 mb-4 text-2xl font-bold  text-gray-900  lg:text-3xl dark:text-white ">
          Your exercise was deleted successfully
        </h2>
        <img className="w-1/2 " src={SuccessLogo}></img>
      </div>
    </div>
  );
};
