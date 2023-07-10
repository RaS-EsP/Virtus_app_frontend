import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGetExercisesByTrainer } from "../../hooks/useGetExercises";
import { Category, Exercise } from "../../../../Interfaces";
import { useGetCategories } from "../../hooks/useGetCategories";
import { json } from "stream/consumers";
import { useFilterExercises } from "./hooks/filterExercises";
import { ExerciseList } from "./components/ExerciseList";
import { click } from "@testing-library/user-event/dist/click";
import { RenderTrainingTemplate } from "./components/RenderTrainingTemplate";

export interface TrainingDetailsInTemplate {
  exercise_id: string;
  exercise_name: string;
  sets: number;
  repetitions: number;
  rir: number;
  weight: number;
  rest: number;
  video_link: string;
}

export const Create_training = () => {
  const { exercises, AreExercisesLoaded, setExercises } =
    useGetExercisesByTrainer([]);
  const { categories } = useGetCategories();
  const [inputCategory, setInputCategory] = useState("");
  const [inputExercise, setInputExercise] = useState("");
  const [IsSelectCategoryOpen, SetIsSelectCategoryOpen] = useState(false);
  const [ListOfCategoriesToFilter, setListOfCategoriesToFilter] = useState<
    string[]
  >([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [TrainingDetails, setTrainingDetails] = useState<any[]>([]);
  const AddTrainingDetails = (exercise: Exercise) => {
    const newExercise = {
      exercise_id: exercise.id,
      exercise_name: exercise.name,
      sets: 4,
      repetitions: 12,
      rir: 0,
      weight: 0,
      rest: 60,
      video_link: exercise.video_link,
    };
    setTrainingDetails((prevExercises) => [...prevExercises, newExercise]);
  };
  const RemoveFromTrainingDetails = (index: number) => {
    const updateTrainingDetails = [...TrainingDetails];
    updateTrainingDetails.splice(index, 1);
    setTrainingDetails(updateTrainingDetails);
  };
  const HandleSelectFilteredCategory = (category: string) => {
    SetIsSelectCategoryOpen(false);
    if (ListOfCategoriesToFilter.includes(category)) {
      return;
    }

    setListOfCategoriesToFilter([...ListOfCategoriesToFilter, category]);
  };
  const handleRemoveCat = (category: string) => {
    setListOfCategoriesToFilter(
      ListOfCategoriesToFilter.filter((cat) => cat != category)
    );
  };

  useFilterExercises({
    ListOfCategoriesToFilter,
    exercises,
    inputExercise,
    setFilteredExercises,
  });

  return (
    <div className="flex flex-col md:flex-row m-5 py-5 drop-shadow-xl rounded-xl bg-white ">
      <div className="w-full flex justify-center mb-5   md:w-1/2 md:border-r-2 px-5  ">
        <div className="w-full">
          <h2 className="font-bold    ">TRAINING TEMPLATE</h2>
          <RenderTrainingTemplate
            setTrainingDetails={setTrainingDetails}
            TrainingDetails={TrainingDetails}
            RemoveFromTrainingDetails={RemoveFromTrainingDetails}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center   px-5">
        <div>
          <h2 className="font-bold ">EXERCISES</h2>
          <div className="relative ">
            <h3
              className="font-semibold mt-1 mb-2
            "
            >
              Select your exercises
            </h3>
            <button className="absolute px-2 right-2 top-0 rounded-2xl bg-ThirdColor text-white hover:text-SecondColor hover:bg-FourthColor">
              Create exercise
            </button>
          </div>
          <div className="flex flex-row gap-5 justify-between">
            <div className="relative z-0 w-1/2 mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
                type="text"
                value={inputExercise}
                onChange={(e) => setInputExercise(e.target.value)}
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
            {/* SEARCH FOR CATEGORIES */}
            <div className="relative z-0 w-1/2  mb-6 group">
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
                htmlFor="Search for categories"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Search for categories
              </label>
              {IsSelectCategoryOpen && (
                <ul className="bg-white overflow-y-auto  max-h-32 border-2 mt-1  rounded-md">
                  {categories.map((category: Category, index: number) => (
                    <>
                      {category.name
                        .toLowerCase()
                        .includes(inputCategory.toLowerCase()) && (
                        <li
                          className="hover:bg-FirstColor cursor-pointer text-xs text-gray-500 hover:text-white p-1"
                          key={index}
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
            {/* SEARCH FOR CATEGORIES */}
          </div>
          <div className="my-1">
            <ul className="flex flex-wrap w-full justify-start items-center  ">
              {ListOfCategoriesToFilter.map((category: string, index: any) => (
                <li
                  className="h-5 flex items-center text-xs bg-FirstColor text-white px-2 py-1 rounded-lg m-1"
                  key={index}
                >
                  <div>
                    {category}
                    <span
                      onClick={() => handleRemoveCat(category)}
                      className="cursor-pointer"
                    >
                      {" "}
                      &times;
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <ExerciseList
              AddToTrainingTemplate={AddTrainingDetails}
              filteredExercises={
                filteredExercises.length > 0 ? filteredExercises : exercises
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from "react";

// import { useGetExercisesByTrainer } from "../../hooks/useGetExercises";
// import {
//   Training,
//   Exercise,
//   TrainingDetails,
//   Category,
// } from "../../../../Interfaces";
// import {
//   RenderEmptyTableWithoutExerciseDetails,
//   RenderTableWithExerciseDetail,
// } from "../../renders/RenderTrainingCreate";
// import { useCreateTrainingTemplate } from "../../hooks/useCreateTraining";
// import { RenderExercisesListWithButton } from "../Exercises/components/RenderExerciseList";
// import { useGetCategories } from "../../hooks/useGetCategories";
// export const Create_training = () => {
//   const { exercises } = useGetExercisesByTrainer();
//   const { categories } = useGetCategories();
//   const [filteredExercises, setFilteredExercises] =
//     useState<Exercise[]>(exercises);
//   if (!exercises) {
//     return <div>Error fetching exercises</div>;
//   }
//   const [inputFormValueTraining, setInputFormValueTraining] =
//     useState<Training>({
//       name: "",
//       description: "",
//     });
//   const [ExercisesDetailTable, setExercisesDetailTable] = useState<Exercise[]>(
//     []
//   );
//   const [trainingDetails, setTrainingDetails] = useState<TrainingDetails>({
//     trainingName: "",
//     trainingDescription: "",
//     exerciseDetails: [],
//   });
//   const [filters, setFilterValue] = useState({
//     NameSearch: "",
//     CategorySearch: "",
//   });
//   const handleChangeFilter = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFilterValue({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleChangeInputForm = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputFormValueTraining({
//       ...inputFormValueTraining,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitTrainingForm = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (!inputFormValueTraining.name || !inputFormValueTraining.description) {
//       return;
//     }
//     setTrainingDetails({
//       trainingName: inputFormValueTraining.name,
//       trainingDescription: inputFormValueTraining.description,
//       exerciseDetails: ExercisesDetailTable.map(
//         (exercise: Exercise, index) => ({
//           exercise_id: exercise.id,
//           sets: parseInt(
//             (document.getElementById(`setsId${index}`) as HTMLInputElement)
//               .value
//           ),
//           repetitions: parseInt(
//             (document.getElementById(`repsId${index}`) as HTMLInputElement)
//               .value
//           ),
//           rir: parseInt(
//             (document.getElementById(`rirId${index}`) as HTMLInputElement).value
//           ),
//           rest: parseInt(
//             (document.getElementById(`restId${index}`) as HTMLInputElement)
//               .value
//           ),
//           weight: parseFloat(
//             (document.getElementById(`weightId${index}`) as HTMLInputElement)
//               .value
//           ),
//         })
//       ),
//     });
//   };

//   const filterExercises = exercises.filter((exercise: Exercise) => {
//     if (filters.CategorySearch == "") {
//       return exercise.name
//         .toLowerCase()
//         .includes(filters.NameSearch.toLowerCase());
//     } else if (filters.NameSearch == "") {
//       return exercise.categories
//         .map((c) => c.name.toLowerCase())
//         .includes(filters.CategorySearch.toLowerCase());
//     } else {
//       console.log("hay ambas");

//       return (
//         exercise.categories
//           .map((c) => c.name.toLowerCase())
//           .includes(filters.CategorySearch.toLowerCase()) &&
//         exercise.name.toLowerCase().includes(filters.NameSearch.toLowerCase())
//       );
//     }
//   });

//   useCreateTrainingTemplate(trainingDetails);

//   return (
//     <div>
//       <form onSubmit={handleSubmitTrainingForm}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={inputFormValueTraining.name}
//           onChange={handleChangeInputForm}
//         />
//         <label htmlFor="description">description</label>
//         <input
//           type="text"
//           name="description"
//           value={inputFormValueTraining.description}
//           onChange={handleChangeInputForm}
//         />
//         <button type="submit">Create training</button>

//         {ExercisesDetailTable.length > 0 ? (
//           <RenderTableWithExerciseDetail
//             ExercisesDetailTable={ExercisesDetailTable}
//           />
//         ) : (
//           <RenderEmptyTableWithoutExerciseDetails />
//         )}
//       </form>
//       <input
//         name="NameSearch"
//         type="text"
//         onChange={handleChangeFilter}
//       ></input>
//       {/* <input
//         name="CategorySearch"
//         type="text"
//         onChange={handleChangeFilter}
//       ></input> */}

//       <select name="CategorySearch" onChange={handleChangeFilter}>
//         <option value="" disabled selected hidden>
//           Choose a category
//         </option>
//         {categories.map((category: Category) => (
//           <option key={category.id} value={category.name}>
//             {category.name}
//           </option>
//         ))}
//       </select>

//       <RenderExercisesListWithButton
//         exercises={filterExercises.length > 0 ? filterExercises : exercises}
//         setExercisesDetailTable={setExercisesDetailTable}
//       />
//     </div>
//   );
// };
