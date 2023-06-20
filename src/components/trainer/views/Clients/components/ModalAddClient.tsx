import React from "react";
import { CloseNavButton } from "../../../../header/NavButtons";
import { CreatingHashForClient } from "./creatingHas";
export const ModalAddClient = ({ HandleAddClientModal }: any) => {
  return (
    <div
      className={` fixed  inset-0 z-10 bg-gray-950 bg-opacity-50 backdrop-blur-sm flex items-center justify-center   
          `}
    >
      <div className="m-5 bg-white drop-shadow-lg max-w-5xl max-h-96 rounded-3xl p-10 overflow-hidden">
        <CreatingHashForClient />
        <div
          onClick={HandleAddClientModal}
          className="absolute right-4 top-2 cursor-pointer hover:ring-1 ring-FourthColor"
        >
          <CloseNavButton />
        </div>
      </div>
    </div>
  );
};
