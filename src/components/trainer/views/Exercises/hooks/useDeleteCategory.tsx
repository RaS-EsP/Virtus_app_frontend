import React from "react";
import axios from "axios";
import { URLS } from "../../../../../urls";
import { Category } from "../../../../../Interfaces";
import { getAuthToken } from "../../../hooks/useIsAuthJwt";

export const useHandleRemoveCategory = async ({
  selectedCategory,
  setCategories,
  setSelectedCategory,
  setDeleteConfirmation,
  setCategoryModalopen,
  categories,
}: any) => {
  try {
    const res = await axios.delete(
      `${URLS.domain}/category/delete/${selectedCategory}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${getAuthToken()}`,
        },
      }
    );
    setCategories((prevCategories: Category[]) =>
      prevCategories.filter((cat: Category) => cat.id !== selectedCategory)
    );

    // Check if the selected category was removed
    if (selectedCategory === categories.id) {
      setSelectedCategory("");
    }
    setDeleteConfirmation(false);

    console.log(res);
  } catch (e) {
    console.error(e);
  }
};
