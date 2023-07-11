import React, { useRef, useState } from "react";
import { Reorder, motion } from "framer-motion";
import { TrainingDetailsInTemplate } from "../create_training";
import { CrossIcon } from "../../../../../img/icons/crossIcon";

export const RenderTrainingTemplate = ({
  TrainingDetails,
  RemoveFromTrainingDetails,
  setTrainingDetails,
  NameTrainingTemplate,
  setNameTrainingTemplate,
  DescriptionTrainingTemplate,
  setDescriptionTrainingTemplate,
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
      <div className="flex mt-2 flex-col gap-1">
        <div className="relative z-0  mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
            type="text"
            required
            value={NameTrainingTemplate}
            onChange={(e) => setNameTrainingTemplate(e.target.value)}
            placeholder=""
          />
          <label
            htmlFor="Search for a exercise"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name for the training template
          </label>
        </div>
        <div className="relative z-0  mb-2 group">
          <textarea
            className="peer h-full min-h-[100px] border-r-2 border-b-2 border-l-2 w-full resize-none rounded-[7px] bg-transparent px-3 py-2.5 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border-2  placeholder-shown:border-t-gray-200 focus:border-2 focus:border-FirstColor focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            value={DescriptionTrainingTemplate}
            onChange={(e) => setDescriptionTrainingTemplate(e.target.value)}
            name="description"
            id="description"
            required
            placeholder=""
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-FirstColor peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-FirstColor peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-FirstColor peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Description
          </label>
        </div>
      </div>

      <div className="relative rounded-xl mt-2 overflow-x-auto overflow-y-hidden">
        <table className="w-full text-xs   text-gray-500 ">
          <thead className="  text-gray-700 uppercase bg-FourthColor ">
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

          {TrainingDetails.length > 0 ? (
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
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={7}
                  className="text-center font-bold text-xl text-gray-600"
                >
                  Add exercise
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};
