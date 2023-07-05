import React, { useEffect } from "react";

export const useCloseSelect = (
  AddCategoriesRef: any,
  SetIsSelectAddCategoryOpen: any
) => {
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        AddCategoriesRef.current &&
        !AddCategoriesRef.current.contains(e.target)
      ) {
        SetIsSelectAddCategoryOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
    [];
  });
};
