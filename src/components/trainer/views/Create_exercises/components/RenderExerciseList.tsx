import React, { useEffect, useRef, useState } from "react";
import { Category, Exercise } from "../../../../../Interfaces";
import { json } from "stream/consumers";
export const RenderExerciseList = ({
  exercises,
  filterExercises,
  categories,
  ListOfFilteredCategories,
  SetListOfFilteredCategories,
}: {
  exercises: Exercise[];
  filterExercises: any;
  categories: Category[];
  ListOfFilteredCategories: [string];
  SetListOfFilteredCategories: any;
}) => {
  const SelectDisplayRef = useRef<any>();
  const [isSelectCategoryOpen, SetIsSelectCategoryOpen] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  useState([ListOfFilteredCategories]);
  const HandleSelectFilteredCategory = (category: string) => {
    SetIsSelectCategoryOpen(false);
    if (ListOfFilteredCategories.includes(category)) {
      return;
    }
    SetListOfFilteredCategories((prevCategories: any) => [
      ...prevCategories,
      category,
    ]);
  };
  const handleRemoveItem = (e: any) => {
    const name = e.target.getAttribute("name");
    SetListOfFilteredCategories(
      ListOfFilteredCategories.filter((item) => item !== name)
    );
  };
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        SelectDisplayRef.current &&
        !SelectDisplayRef.current.contains(e.target)
      ) {
        SetIsSelectCategoryOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
    [];
  });

  return (
    <>
      <div className="rounded-xl drop-shadow-md bg-white px-5 mx-5 mb-5 py-5  ">
        <div className="flex flex-row gap-5 justify-between">
          <div className="relative z-0 w-1/2 mb-6 group">
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
              type="text"
              onChange={(e) => filterExercises(e.target.value)}
              name="filter"
              id="filter"
              placeholder=""
            />
            <label
              htmlFor="Search for a exercise"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Search for a exercise
            </label>
          </div>
          <div
            className="relative z-0 w-1/2  mb-6 group"
            ref={SelectDisplayRef}
          >
            <input
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
              type="text"
              value={inputCategory}
              onChange={(e: any) => {
                setInputCategory(e.target.value);
              }}
              name="filterCategory"
              id="filterCategory"
              placeholder=""
              onClick={() => SetIsSelectCategoryOpen(true)}
            />
            <label
              htmlFor="Search for a exercise"
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
                      .includes(inputCategory.toLowerCase()) && (
                      <li
                        className="hover:bg-FirstColor text-xs text-gray-500 hover:text-white p-1"
                        key={category.id}
                        onClick={() =>
                          HandleSelectFilteredCategory(category.name)
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
        </div>
        <div className="my-1">
          <ul className="flex flex-wrap w-full justify-start items-center  ">
            {ListOfFilteredCategories.map((category: string, index: number) => (
              <li
                className="h-5 flex items-center text-xs bg-FirstColor text-white px-2 py-1 rounded-lg m-1"
                key={index}
              >
                <span>{category} </span>
                <button name={category} onClick={handleRemoveItem}>
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center  ">
          {exercises.map((exercise: Exercise, index: number) => (
            <li key={index}>
              <div className="relative ">
                <img
                  className="w-[320px] h-[180px] rounded-xl drop-shadow-lg cursor-pointer hover:brightness-75   "
                  src={`https://img.youtube.com/vi/${
                    exercise.video_link.split("v=")[1]
                  }/mqdefault.jpg`}
                  alt={`Youtube video ${exercise.video_link.split("v=")[1]}`}
                />

                <div className="absolute  left-2  bottom-7 flex items-center justify-center">
                  <h2 className="text-white text-base font-bold">
                    {exercise.name}
                  </h2>
                </div>
                <div className="absolute  left-2  bottom-1 flex items-center justify-center bg-FirstColor rounded-xl px-2 py-1">
                  <h2 className="text-white text-xs font-bold">
                    {exercise.categories[0].name}
                  </h2>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

type SetExercisesDetailTable = React.Dispatch<React.SetStateAction<Exercise[]>>;
export const RenderExercisesListWithButton = ({
  exercises,
  setExercisesDetailTable,
}: {
  exercises: Exercise[];
  setExercisesDetailTable: SetExercisesDetailTable;
}) => {
  const [sliceNumber, setSliceNumber] = useState(2);
  return (
    <div className="">
      {exercises.slice(0, sliceNumber).map((exercise: Exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <iframe
            width="210"
            height="172.5"
            src={`https://www.youtube.com/embed/${
              exercise.video_link.split("v=")[1]
            }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div>
            <button
              onClick={() => {
                setExercisesDetailTable((prevExercises: Exercise[]) => [
                  ...prevExercises,
                  exercise,
                ]);
              }}
            >
              Add Exercise
            </button>
          </div>
        </div>
      ))}
      {exercises.length > sliceNumber && (
        <button
          className="bg-white w-full"
          onClick={() => {
            setSliceNumber((prevState) => prevState + 4);
          }}
        >
          SHOW MORE
        </button>
      )}
    </div>
  );
};
