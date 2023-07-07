import React from "react";

import { TrainingDetailsInTemplate } from "../create_training";
import { CrossIcon } from "../../../../../img/icons/crossIcon";

export const RenderTrainingTemplate = ({
  TrainingDetails,
  RemoveFromTrainingDetails,
}: any) => {
  return (
    <>
      <div className="relative rounded-xl mt-5 overflow-x-auto">
        <table className="w-full text-sm  text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-FourthColor dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Exercise
              </th>
              <th scope="col" className="px-6 py-3">
                Sets
              </th>
              <th scope="col" className="px-6 py-3">
                Reps
              </th>
              <th scope="col" className="px-6 py-3">
                Rir
              </th>
              <th scope="col" className="px-6 py-3">
                Weight
              </th>
              <th scope="col" className="px-6 py-3">
                Rest
              </th>
              <th scope="col" className=""></th>
            </tr>
          </thead>
          <tbody>
            {TrainingDetails.map(
              (detail: TrainingDetailsInTemplate, index: number) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6  py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                    {detail.exercise_name}
                  </td>
                  <td className="px-6 py-4">{detail.sets}</td>
                  <td className="px-6 py-4">{detail.repetitions}</td>
                  <td className="px-6 py-4">{detail.rir}</td>
                  <td className="px-6 py-4">{detail.weight}</td>
                  <td className="px-6 py-4">{detail.rest}</td>
                  <td className="">
                    <button
                      onClick={() => RemoveFromTrainingDetails(index)}
                      className="rounded-full text-white  hover:scale-105 font-bold bg-FourthColor"
                    >
                      <CrossIcon />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
