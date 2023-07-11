import React, { useRef } from "react";
import { Reorder, motion } from "framer-motion";
import { TrainingDetailsInTemplate } from "../create_training";
import { CrossIcon } from "../../../../../img/icons/crossIcon";

export const RenderTrainingTemplate = ({
  TrainingDetails,
  RemoveFromTrainingDetails,
  setTrainingDetails,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
  const handleInputTrainingDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const newTrainingDetails = [...TrainingDetails]; // Copia el array original para evitar mutaciones directas
    newTrainingDetails[index] = {
      ...newTrainingDetails[index], // Copia el objeto del elemento actual
      [field]: e.target.value, // Actualiza el campo específico con el nuevo valor
    };
    setTrainingDetails(newTrainingDetails); // Actualiza el estado con el nuevo array modificado
  };
  const moveFocus = (
    index: number,
    direction: "up" | "down",
    inputElement: HTMLInputElement
  ) => {
    if (direction === "up" && index > 0) {
      const newIndex = index - 1;
      const inputElements = document.querySelectorAll<HTMLInputElement>(
        `input[name=${inputElement.name}]`
      );
      inputElements[newIndex].focus();
    } else if (direction === "down" && index < TrainingDetails.length - 1) {
      const newIndex = index + 1;
      const inputElements = document.querySelectorAll<HTMLInputElement>(
        `input[name=${inputElement.name}]`
      );
      inputElements[newIndex].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "ArrowUp") {
      const inputElement = e.target as HTMLInputElement;
      moveFocus(index, "up", inputElement);
    } else if (e.key === "ArrowDown") {
      const inputElement = e.target as HTMLInputElement;
      moveFocus(index, "down", inputElement);
    }
  };

  return (
    <>
      <div className="relative rounded-xl mt-5 overflow-x-auto overflow-y-hidden">
        <table className="w-full text-sm   text-gray-500 dark:text-gray-400">
          <thead className="text-xs  text-gray-700 uppercase bg-FourthColor ">
            <tr>
              <th scope="col" className="px-0 py-3  ">
                Exercise
              </th>
              <th scope="col" className="px-0 py-3  ">
                Sets
              </th>
              <th scope="col" className="px-0 py-3 ">
                Reps
              </th>
              <th scope="col" className="px-0 py-3 ">
                Rir
              </th>
              <th scope="col" className="px-0 py-3 ">
                Weight
              </th>
              <th scope="col" className="px-0 py-3 ">
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
                    className="bg-white  text-center border-b px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {detail.exercise_name}
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    <input
                      type="number"
                      required
                      className="  px-1 w-[55px] text-center focus:outline-none rounded-lg border-2 bg- focus:border-ThirdColor border-gray-200"
                      value={detail.sets}
                      min={0}
                      onChange={(e) =>
                        handleInputTrainingDetails(e, index, "sets")
                      }
                    />
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    <input
                      name="repetitions" // Agrega este atributo
                      className="px-1 w-[55px] text-center focus:outline-none rounded-lg border-2 bg- focus:border-ThirdColor border-gray-200"
                      min={0}
                      value={detail.repetitions}
                      onChange={(e) =>
                        handleInputTrainingDetails(e, index, "repetitions")
                      }
                      onKeyDown={(e) => handleKeyDown(e, index)} // Agrega este atributo
                    />
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    <input
                      name="rir" // Agrega este atributo
                      className="  px-1 w-[55px] text-center focus:outline-none rounded-lg border-2 bg- focus:border-ThirdColor border-gray-200"
                      value={detail.rir}
                      min={0}
                      onChange={(e) =>
                        handleInputTrainingDetails(e, index, "rir")
                      }
                      onKeyDown={(e) => handleKeyDown(e, index)} // Agrega este atributo
                    />
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    <input
                      name="weight" // Agrega este atributo
                      className="  px-1 w-[62px] text-center focus:outline-none rounded-lg border-2 bg- focus:border-ThirdColor border-gray-200"
                      value={detail.weight}
                      max={999}
                      onChange={(e) =>
                        handleInputTrainingDetails(e, index, "weight")
                      }
                      onKeyDown={(e) => handleKeyDown(e, index)} // Agrega este atributo
                    />
                  </motion.td>
                  <motion.td className="bg-white border-b px-6 py-4">
                    <input
                      className="  px-1 w-[55px] text-center focus:outline-none rounded-lg border-2 bg- focus:border-ThirdColor border-gray-200"
                      value={detail.rest}
                      type="number"
                      required
                      min={0}
                      onChange={(e) =>
                        handleInputTrainingDetails(e, index, "rest")
                      }
                    />
                  </motion.td>
                  <motion.td className="border-b">
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
