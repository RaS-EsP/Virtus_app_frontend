import React, { useState } from "react";
import { CloseNavButton } from "../../../../header/NavButtons";
import { Category, Exercise } from "../../../../../Interfaces";
import { DeleteConfirmationmodal } from "./DeleteConfirmationmodalopen";
import axios from "axios";
import { URLS } from "../../../../../urls";
import { getAuthToken } from "../../../hooks/useIsAuthJwt";
import { useHandleRemoveCategory } from "../hooks/useDeleteCategory";
import { useGetExercisesByTrainer } from "../../../hooks/useGetExercises";

export const CategoryModal = ({
  setCategoryModalopen,
  categories,
  setCategories,
  setExercises,
}: any) => {
  const [NewCategoryInput, setNewCategoryInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [DeleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const CreateCategory = async () => {
    try {
      const response = await axios.post(
        `${URLS.domain}/category/create`,
        {
          name: NewCategoryInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${getAuthToken()}`,
          },
        }
      );
      setCategories((prevcat: Category[]) => [
        ...prevcat,
        response.data.data.Category,
      ]);
      setNewCategoryInput("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gray-950 bg-opacity-50 backdrop-blur-sm py-5 flex items-center justify-center ">
        <div className="m-5 pl-5 flex flex-col items-center justify-center bg-white drop-shadow-lg   lg:mx-[350px] w-full -translate-y-20 pb-2  l rounded-3xl  overflow-hidden">
          <div
            onClick={() => setCategoryModalopen((prevState: any) => !prevState)}
            className="absolute right-4 top-2 cursor-pointer hover:ring-1 ring-FourthColor"
          >
            <CloseNavButton />
          </div>
          <div className="w-full text-left ml-10 mt-2 font-bold">
            CATEGORIES
          </div>{" "}
          <div className="font-semibold  border-t-2 w-full text-center mt-2">
            <span className="w-full flex justify-center">
              Create Category &nbsp;
            </span>
            <div className={`font-normal `}>
              <span
                className={` flex justify-center items-center 
              `}
              >
                <input
                  className="bg-gray-100 rounded-md w-full border-gray-200 border-2 focus:outline-none px-5  my-2"
                  type="text"
                  value={NewCategoryInput}
                  placeholder="New category"
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                ></input>
                {NewCategoryInput == "" ? (
                  <button className="flex items-center  bg-SecondColor text-white cursor-not-allowed rounded-xl py-1 px-2 mx-2 ">
                    Create
                  </button>
                ) : (
                  <button
                    onClick={() => CreateCategory()}
                    className="flex items-center  bg-FirstColor hover:bg-SecondColor hover:text-white text-white rounded-xl py-1 px-2 mx-2 "
                  >
                    Create
                  </button>
                )}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-row items-center">
            <ul className="w-full rounded-lg flex flex-col bg-gray-100 border-2 border-gray-200 p-3  my-2 max-h-44 overflow-y-auto">
              {categories.map((cat: Category) => (
                <li
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${
                    selectedCategory == cat.id && "bg-gray-300"
                  } hover:bg-FirstColor hover:text-white hover:font-normal cursor-pointer font-light w-full px-2 rounded-xl`}
                  key={cat.id}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
            {selectedCategory ? (
              <button
                onClick={() => setDeleteConfirmation(true)}
                className="flex items-center  bg-ThirdColor hover:bg-FourthColor hover:text-SecondColor text-white rounded-xl py-1 px-2 mx-2 "
              >
                Delete
              </button>
            ) : (
              <button className="flex items-center  bg-FourthColor text-SecondColor cursor-not-allowed rounded-xl py-1 px-2 mx-2 ">
                Delete
              </button>
            )}
          </div>
        </div>
        {DeleteConfirmation && (
          <DeleteCatModal
            setDeleteConfirmation={setDeleteConfirmation}
            selectedCategory={selectedCategory}
            setCategories={setCategories}
            setCategoryModalopen={setCategoryModalopen}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        )}
      </div>
    </>
  );
};

export const DeleteCatModal = ({
  setDeleteConfirmation,
  selectedCategory,
  setCategories,
  setCategoryModalopen,
  setSelectedCategory,
  categories,
}: any) => {
  return (
    <div className="fixed inset-0 z-20 bg-gray-950 bg-opacity-50 backdrop-blur-sm flex items-center justify-center ">
      <div className="m-5 py-5 h-auto flex flex-col items-center justify-center bg-white drop-shadow-lg max-w-lg max-h-96 rounded-3xl  overflow-hidden">
        <h2 className="mt-2  text-center px-10 mb-4 text-2xl font-bold  text-gray-900  dark:text-white ">
          Are you sure that you want to delete this category?{" "}
        </h2>
        <div className="flex gap-2 w-full">
          <button
            onClick={() => {
              useHandleRemoveCategory({
                setCategoryModalopen,
                selectedCategory,
                setCategories,
                setSelectedCategory,
                setDeleteConfirmation,
                categories,
              });
            }}
            className="rounded-xl bg-FirstColor text-white py-1 mb-2 cursor-pointer hover:bg-SecondColor font-bold w-full  mx-5"
          >
            YES
          </button>
          <button
            onClick={() => setDeleteConfirmation(false)}
            className="rounded-xl bg-white border-FirstColor hover:text-white hover:border-ThirdColor border-2 hover:bg-ThirdColor text-FirstColor py-1 mb-2 cursor-pointer  font-bold w-full mx-5"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};
