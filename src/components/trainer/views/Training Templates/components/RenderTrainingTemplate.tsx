import React from "react";
import { Reorder, motion } from "framer-motion";
import { TrainingDetailsInTemplate } from "../create_training";
import { CrossIcon } from "../../../../../img/icons/crossIcon";

export const RenderTrainingTemplate = ({
  TrainingDetails,
  RemoveFromTrainingDetails,
  setTrainingDetails,
}: any) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <div className="relative rounded-xl mt-5 overflow-x-auto overflow-y-hidden">
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

          <Reorder.Group
            as="tbody"
            values={TrainingDetails}
            onReorder={setTrainingDetails}
            axis="y"
            variants={container}
          >
            {TrainingDetails.map(
              (detail: TrainingDetailsInTemplate, index: number) => (
                <Reorder.Item
                  as="tr"
                  key={detail.exercise_id}
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  value={detail}
                >
                  <motion.td
                    key={index}
                    className="bg-white border-b px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {detail.exercise_name}
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    {detail.sets}
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    {detail.repetitions}
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    {detail.rir}
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    {detail.weight}
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    {detail.rest}
                  </motion.td>
                  <motion.td className="border-b">
                    {" "}
                    <button
                      onClick={() => RemoveFromTrainingDetails(index)}
                      className="rounded-full text-white  hover:scale-105 font-bold bg-FourthColor"
                    >
                      <CrossIcon />
                    </button>
                  </motion.td>
                </Reorder.Item>
              )
            )}
          </Reorder.Group>
        </table>
      </div>
    </>
  );
};
