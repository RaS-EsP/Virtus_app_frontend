import React, { useEffect, useState } from "react";
import { Categories, Category } from "../../../../../Interfaces";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetCategories } from "../../../hooks/useGetCategories";

export const RenderExerciseCreateForm = ({
  inputForm,
  handleChangeForm,
  HandleSubmitForm,
  setInputForm,
  setSelected,
  selected,
}: any) => {
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
            type="text"
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
        <CategorySelector
          setInputForm={setInputForm}
          inputForm={inputForm}
          selected={selected}
          setSelected={setSelected}
        />
        <div className=" flex justify-center ">
          <button
            className=" bg-FirstColor hover:bg-SecondColor my-2 mx-20 w-full md:w-96 rounded-2xl px-2 py-1 text-white"
            type="submit"
          >
            Create Exercise
          </button>
        </div>
      </form>
    </>
  );
};

export const CategorySelector = ({
  setInputForm,
  selected,
  setSelected,
}: any) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const { categories } = useGetCategories();
  return (
    <div className="w-full mt-5 rounded-lg border-2 font-medium max-h-80 ">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center text-black justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select category"}
        <BiChevronDown
          size={20}
          className={`${
            open
              ? " transition-transform ease-in-out  rotate-180"
              : " transition-transform ease-in-out  rotate-0"
          }`}
        />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter category name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {categories?.map((category: Category) => (
          <li
            key={category?.id}
            className={`p-2 text-sm hover:bg-FirstColor hover:text-white
            ${
              category?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-white text-gray-500"
            }
            ${
              category?.name?.toLowerCase().startsWith(inputValue)
                ? "block text-gray-500"
                : "hidden"
            }`}
            onClick={() => {
              if (category?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(category?.name);
                setOpen(false);
                setInputValue("");
                setInputForm((existingValues: any) => ({
                  ...existingValues,
                  category: category.id,
                }));
              }
            }}
          >
            {category?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
