import React, { useRef, useState } from "react";
import { CloseNavButton } from "../../../../header/NavButtons";
import { Category, Exercise } from "../../../../../Interfaces";
import { useCloseSelect } from "../hooks/useCloseSelect";
import { Transition } from "@headlessui/react";
import axios from "axios";
import { URLS } from "../../../../../urls";
import { getAuthToken } from "../../../hooks/useIsAuthJwt";
import { Successmodal } from "./SucessModal";
import { SuccessDeletemodal } from "./SucessDeleteModal";
import { transitionClases } from "../../../../../transitions/transitions";

export const ExerciseModal = ({
  closeModal,
  ExerciseModalInfo,
  categories,
  setExercises,
}: any) => {
  const [ExerciseValues, setExerciseValues] = useState({
    id: ExerciseModalInfo.id,
    name: ExerciseModalInfo.name,
    description: ExerciseModalInfo.description,
    video_link: ExerciseModalInfo.video_link,
    categories: ExerciseModalInfo.categories,
  });
  const [inputCategoryModal, setInputCategoryModal] = useState("");
  const SelectDisplayModalRef = useRef<any>();
  const [isSelectCategoryOpen, SetIsSelectCategoryOpen] = useState(false);
  const [SuccessDeletemodalopen, setSuccessDeletemodalopen] = useState(false);
  const handleChangeExerciseValues = (e: any) => {
    setExerciseValues({
      ...ExerciseValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleRemoveCat = (id: any) => {
    setExerciseValues((prevExerciseValues) => ({
      ...prevExerciseValues,
      categories: prevExerciseValues.categories.filter(
        (item: any) => item.id !== id
      ),
    }));
  };
  const HandleSelectFilteredCategoryModal = (category: Category) => {
    SetIsSelectCategoryOpen(false);
    if (
      ExerciseValues.categories.some((cat: Category) => cat.id === category.id)
    ) {
      return; // Salir de la función si la categoría ya existe
    }
    setExerciseValues((prevExerciseValues) => ({
      ...prevExerciseValues,
      categories: [...prevExerciseValues.categories, category],
    }));
  };
  useCloseSelect(SelectDisplayModalRef, SetIsSelectCategoryOpen);
  const handleDeleteExercise = () => {
    async function deleteExercise(exerciseId: string) {
      try {
        const response = await axios.delete(
          `${URLS.domain}/exercise/delete/${exerciseId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );
        setExercises((prevExercises: Exercise[]) =>
          prevExercises.filter((exercise) => exercise.id !== ExerciseValues.id)
        );
        setSuccessDeletemodalopen(true);

        setTimeout(() => {
          setSuccessDeletemodalopen(false);
          closeModal((prevState: any) => !prevState);
        }, 2000);
        // Hacer algo con la respuesta exitosa
      } catch (error) {
        console.error(error);
        // Hacer algo con el error
      }
    }
    deleteExercise(ExerciseValues.id);
  };
  const handleSubmitExercise = () => {
    if (ExerciseValues.categories.length == 0) {
      alert("You must add at least one category");
      return;
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-20 bg-gray-950 bg-opacity-50 backdrop-blur-sm    flex items-center justify-center ">
        <div className=" bg-white drop-shadow-lg  w-full md:w-8/12 mx-5  md:m-10  h-5/6  rounded-3xl p-5 md:p-10 overflow-y-auto  ">
          <h2 className="mb-5 text-xl font-bold">Edit Exercise</h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
              type="text"
              onChange={handleChangeExerciseValues}
              name="name"
              value={ExerciseValues.name}
              placeholder=""
            />
            <label
              htmlFor="Search for a exercise"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          <div className="relative w-full min-w-[200px]">
            <textarea
              className="peer h-full min-h-[100px] border-r-2 border-b-2 border-l-2 w-full resize-none rounded-[7px] bg-transparent px-3 py-2.5 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border-2  placeholder-shown:border-t-gray-200 focus:border-2 focus:border-FirstColor focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              value={ExerciseValues.description}
              onChange={handleChangeExerciseValues}
              name="description"
              id="description"
              required
              placeholder=""
            />
            <label
              htmlFor="description"
              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-FirstColor peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-FirstColor peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-FirstColor peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mt-5 mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
              type="url"
              onChange={handleChangeExerciseValues}
              name="video_link"
              value={ExerciseValues.video_link}
              placeholder=""
            />
            <label
              htmlFor="Search for a video link"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Youtube video link
            </label>
          </div>

          {!ExerciseValues.video_link.startsWith("https://youtu.be/") ? (
            <div className="flex justify-center    ">
              <iframe
                className="w-full aspect-video drop-shadow-xl rounded-lg"
                src={`https://www.youtube.com/embed/${
                  ExerciseValues.video_link.split("v=")[1]
                }`}
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full  flex justify-center">
              <iframe
                className="w-full aspect-video drop-shadow-xl rounded-lg"
                src={`https://www.youtube.com/embed/${ExerciseValues.video_link.substr(
                  "https://youtu.be/".length
                )}`}
                allowFullScreen
              />
            </div>
          )}
          <div className="relative text-left md:text-center">
            {ExerciseValues.categories.map((cat: any, index: number) => (
              <div
                key={index}
                className="inline-block mx-[2px]  bg-FirstColor rounded-xl mt-1 px-2 py-1"
              >
                <h2 className="text-white text-xs ">
                  {cat.name}
                  <span
                    onClick={() => handleRemoveCat(cat.id)}
                    className="cursor-pointer"
                  >
                    {" "}
                    &times;
                  </span>
                </h2>
              </div>
            ))}
          </div>
          {/* SELECT CATEGORIES */}
          <div
            className="relative z-0 mt-6  mb-6 group"
            ref={SelectDisplayModalRef}
          >
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
              type="text"
              value={inputCategoryModal}
              onChange={(e: any) => {
                setInputCategoryModal(e.target.value);
              }}
              name="filterCategory"
              id="filterCategory"
              placeholder=""
              onClick={() => SetIsSelectCategoryOpen(true)}
            />
            <label
              htmlFor="Search for categories"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Search for categories
            </label>
            {isSelectCategoryOpen && (
              <ul className="bg-white overflow-y-auto  max-h-40 border-2 mt-1  rounded-md">
                {categories.map((category: Category) => (
                  <>
                    {category.name
                      .toLowerCase()
                      .includes(inputCategoryModal.toLowerCase()) && (
                      <li
                        className="hover:bg-FirstColor text-xs text-gray-500 hover:text-white p-1"
                        key={category.id}
                        onClick={() =>
                          HandleSelectFilteredCategoryModal(category)
                        }
                      >
                        {category.name}
                      </li>
                    )}
                  </>
                ))}
              </ul>
            )}
          </div>
          {/* SELECT CATEGORIES */}
          <div
            onClick={() => closeModal((prevState: any) => !prevState)}
            className="absolute right-4 top-2 cursor-pointer hover:ring-1 ring-FourthColor"
          >
            <CloseNavButton />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleDeleteExercise}
              className="bg-red-400 text-white rounded-2xl px-2 py-1 hover:bg-red-500"
            >
              Delete
            </button>
            <button
              onClick={handleSubmitExercise}
              className="bg-SecondColor text-white rounded-2xl px-2 py-1 hover:bg-FirstColor"
            >
              Save Exercise
            </button>
          </div>
        </div>
      </div>{" "}
      <Transition show={SuccessDeletemodalopen} {...transitionClases.opacity2}>
        <SuccessDeletemodal />
      </Transition>
    </>
  );
};
