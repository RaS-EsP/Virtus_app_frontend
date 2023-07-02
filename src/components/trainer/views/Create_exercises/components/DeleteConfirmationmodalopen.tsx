import React from "react";

export const DeleteConfirmationmodal = ({
  closeModal,
  OpenDeleteModal,
}: any) => {
  return (
    <div className="fixed inset-0 z-20 bg-gray-950 bg-opacity-50 backdrop-blur-sm flex items-center justify-center ">
      <div className="m-5 py-5 h-auto flex flex-col items-center justify-center bg-white drop-shadow-lg max-w-lg max-h-96 rounded-3xl  overflow-hidden">
        <h2 className="mt-2  text-center px-10 mb-4 text-2xl font-bold  text-gray-900  dark:text-white ">
          Are you sure that you want to delete this exercise?{" "}
        </h2>
        <div className="flex gap-2 w-full">
          <button
            onClick={() => {
              closeModal(false);
              OpenDeleteModal();
            }}
            className="rounded-xl bg-green-300  py-1 mb-2 cursor-pointer hover:bg-green-400 font-bold w-full  mx-5"
          >
            YES
          </button>
          <button
            onClick={() => closeModal(false)}
            className="rounded-xl bg-red-300  py-1 mb-2 cursor-pointer hover:bg-red-400 font-bold w-full mx-5"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};
