import React, { useRef, useState } from "react";
import { useGetExercisesByTrainer } from "../../hooks/useGetExercises";
import { Category, Exercise } from "../../../../Interfaces";
import { useGetCategories } from "../../hooks/useGetCategories";

export const Create_training = () => {
  const { exercises, AreExercisesLoaded, setExercises } =
    useGetExercisesByTrainer([]);
  const { categories } = useGetCategories();
  const HandleExerciseSearch = () => {
    console.log("hola");
  };
  const [inputCategory, setInputCategory] = useState("");
  const [IsSelectCategoryOpen, SetIsSelectCategoryOpen] = useState(false);
  const [ListOfCategoriesToFilter, setListOfCategoriesToFilter] = useState<
    string[]
  >([]);
  const HandleSelectFilteredCategory = (category: string) => {
    SetIsSelectCategoryOpen(false);
    if (ListOfCategoriesToFilter.includes(category)) {
      return;
    }

    setListOfCategoriesToFilter([...ListOfCategoriesToFilter, category]);
  };
  const handleRemoveCat = (category: string) => {
    console.log(category);
  };
  return (
    <div className="flex flex-col md:flex-row m-5 py-5 drop-shadow-xl rounded-xl bg-white ">
      <div className="w-full flex justify-center items-center  md:w-1/2 border-r-2 px-5  "></div>
      <div className="w-full md:w-1/2 flex justify-center items-center  px-5">
        <div>
          <h2 className="font-bold mb-4">EXERCISES</h2>
          <div className="flex flex-row gap-5 justify-between">
            <div className="relative z-0 w-1/2 mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
                type="text"
                onChange={HandleExerciseSearch}
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
                <ul className="bg-white overflow-y-auto  max-h-40 border-2 mt-1  rounded-md">
                  {categories.map((category: Category) => (
                    <>
                      {category.name
                        .toLowerCase()
                        .includes(inputCategory.toLowerCase()) && (
                        <li
                          className="hover:bg-FirstColor cursor-pointer text-xs text-gray-500 hover:text-white p-1"
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
            {/* SEARCH FOR CATEGORIES */}
          </div>
          <div className="my-1">
            <ul className="flex flex-wrap w-full justify-start items-center  ">
              {ListOfCategoriesToFilter.map(
                (category: string, index: number) => (
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
                )
              )}
            </ul>
          </div>
          <ul className=" grid grid-cols-1 sm:grid-cols-2    gap-2 justify-items-center  ">
            {exercises.map((exercise: Exercise) => (
              <li key={exercise.id}>
                <div className="relative ">
                  {exercise.video_link.startsWith("https://youtu.be/") ? (
                    <img
                      className="w-[320px] h-[180px] rounded-xl drop-shadow-lg cursor-pointer hover:brightness-75"
                      src={`https://img.youtube.com/vi/${exercise.video_link.substr(
                        "https://youtu.be/".length
                      )}/mqdefault.jpg`}
                      alt={`Youtube video ${exercise.video_link.substr(
                        "https://youtu.be/".length
                      )}`}
                    />
                  ) : (
                    <img
                      className="w-[320px] h-[180px] rounded-xl drop-shadow-lg cursor-pointer hover:brightness-75   "
                      src={`https://img.youtube.com/vi/${
                        exercise.video_link.split("v=")[1]
                      }/mqdefault.jpg`}
                      alt={`Youtube video ${
                        exercise.video_link.split("v=")[1]
                      }`}
                    />
                  )}
                  <div className="absolute bg-FirstColor bg-opacity-50 rounded-lg px-1 left-2  top-1 flex items-center justify-center">
                    <h2 className="text-white  text-sm font-bold">
                      {exercise.name}
                    </h2>
                  </div>
                  <div className="absolute bg-FirstColor  rounded-full px-2 right-2  top-1 flex items-center justify-center">
                    <h2 className="text-white  text-sm font-bold cursor-pointer">
                      Add +
                    </h2>
                  </div>
                  <div className="absolute bottom-1 left-1">
                    {exercise.categories.map((cat: any, index: number) => (
                      <div
                        key={index}
                        className="inline-block mx-[2px] opacity-80  bg-FirstColor rounded-xl px-2 py-1"
                      >
                        <h2 className="text-white text-xs font-bold">
                          {cat.name}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
