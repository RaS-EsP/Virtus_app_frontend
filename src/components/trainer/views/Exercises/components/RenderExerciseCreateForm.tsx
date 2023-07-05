import React, { useEffect, useRef, useState } from "react";
import { Category } from "../../../../../Interfaces";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetCategories } from "../../../hooks/useGetCategories";
import { forEachChild } from "typescript";
import { useCloseSelect } from "../hooks/useCloseSelect";
import { CategoryModal } from "./categorieModal";
import { Transition } from "@headlessui/react";
import { transitionClases } from "../../../../../transitions/transitions";
import Tooltip from "@mui/material/Tooltip";

export const RenderExerciseCreateForm = ({
  inputForm,
  handleChangeForm,
  HandleSubmitForm,
  setInputForm,
  setSelected,
  selected,
  setExercises,
  categories,
  ListOfFilteredAddCategories,
  SetListOfFilteredAddCategories,
  setCategories,
  CategoryModalopen,
  setCategoryModalopen,
}: any) => {
  const [tooltipState, setTooTipState] = useState<boolean>(false);
  const [inputAddCategory, setInputAddCategory] = useState("");
  const [isSelectAddCategoryOpen, SetIsSelectAddCategoryOpen] = useState(false);
  const AddCategoriesRef = useRef<any>();

  const HandleAddCategory = (category_id: string, category_name: string) => {
    SetIsSelectAddCategoryOpen(false);

    const existingCategory = ListOfFilteredAddCategories.find(
      (element: any) => element.id === category_id
    );

    if (existingCategory) {
      return;
    }

    SetListOfFilteredAddCategories((prevCategories: any) => [
      ...prevCategories,
      { id: category_id, name: category_name },
    ]);
  };
  const handleRemoveItem = (e: any) => {
    e.preventDefault();
    const id = e.target.getAttribute("name");
    SetListOfFilteredAddCategories(
      ListOfFilteredAddCategories.filter((item: any) => item.id !== id)
    );
  };

  useCloseSelect(AddCategoriesRef, SetIsSelectAddCategoryOpen);
  return (
    <>
      <form
        className="bg-white drop-shadow-md m-5 w-auto rounded-xl p-2 "
        onSubmit={HandleSubmitForm}
      >
        <div className="relative z-0  mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
            type="text"
            value={inputForm.name}
            onChange={handleChangeForm}
            name="name"
            id="name"
            required
            placeholder=""
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name:
          </label>
        </div>
        <div className="relative z-0  mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
            type="url"
            value={inputForm.video_link}
            onChange={handleChangeForm}
            name="video_link"
            id="video_link"
            required
            placeholder=""
          />
          <label
            htmlFor="video_link"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Youtube Video link
          </label>
        </div>

        <div className="relative w-full min-w-[200px]">
          <textarea
            className="peer h-full min-h-[100px] border-r-2 border-b-2 border-l-2 w-full resize-none rounded-[7px] bg-transparent px-3 py-2.5 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border-2  placeholder-shown:border-t-gray-200 focus:border-2 focus:border-FirstColor focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            value={inputForm.description}
            onChange={handleChangeForm}
            name="description"
            id="description"
            required
            placeholder=""
          />
          <label
            htmlFor="video_link"
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-FirstColor peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-FirstColor peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-FirstColor peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
          >
            Description
          </label>
        </div>

        {/* SEARCH FOR CATEGORIES */}
        <div className="relative z-0  mt-4  mb-6 group" ref={AddCategoriesRef}>
          <Tooltip open={tooltipState} title="Edit" placement="left">
            <button
              onClick={() => setCategoryModalopen(!CategoryModalopen)}
              onMouseEnter={() => setTooTipState(true)}
              onMouseLeave={() => setTooTipState(false)}
              type="button"
              className="fixed right-3 text-FirstColor hover:text-SecondColor translate-y-3 scale-150  "
            >
              +
            </button>
          </Tooltip>

          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-FirstColor peer"
            type="text"
            value={inputAddCategory}
            onChange={(e: any) => {
              setInputAddCategory(e.target.value);
            }}
            name="filterCategory"
            id="filterCategory"
            placeholder=""
            onClick={() => SetIsSelectAddCategoryOpen(true)}
          />

          <label
            htmlFor="Search for categories"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-FirstColor peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Select categories
          </label>

          {isSelectAddCategoryOpen && (
            <ul className="bg-white overflow-y-auto  max-h-40 border-2 mt-1  rounded-md">
              {categories.map((category: Category) => (
                <>
                  {category.name
                    .toLowerCase()
                    .includes(inputAddCategory.toLowerCase()) && (
                    <li
                      className="hover:bg-FirstColor text-xs text-gray-500 hover:text-white p-1"
                      key={category.id}
                      onClick={() =>
                        HandleAddCategory(category.id, category.name)
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
        <div className="my-1">
          <ul className="flex flex-wrap w-full justify-start items-center  ">
            {ListOfFilteredAddCategories.map((category: any, index: number) => (
              <li
                className="h-5 flex items-center text-xs bg-FirstColor text-white px-2 py-1 rounded-lg m-1"
                key={index}
              >
                <span>{category.name} </span>
                <button name={category.id} onClick={handleRemoveItem}>
                  &nbsp;&times;
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className=" flex justify-center ">
          <button
            className=" bg-FirstColor hover:bg-SecondColor my-2 mx-20 w-full md:w-96 rounded-2xl px-2 py-1 text-white"
            type="submit"
          >
            Create Exercise
          </button>
        </div>
      </form>
      {CategoryModalopen && (
        <CategoryModal
          categories={categories}
          setCategoryModalopen={setCategoryModalopen}
          setCategories={setCategories}
          setExercises={setExercises}
        />
      )}
    </>
  );
};
