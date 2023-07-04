import React, { useEffect, useState } from "react";
import { URLS } from "../../../urls";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAuthToken } from "./useIsAuthJwt";
export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [IsCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  useEffect(() => {
    const GetCategories = async () => {
      try {
        const categoriesFetch = await axios.get(
          `${URLS.domain}/category/get_categories`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${getAuthToken()}`,
            },
          }
        );
        setCategories(categoriesFetch.data.data.Categories);
        setIsCategoriesLoaded(true);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    GetCategories();
  }, []);

  return { categories, IsCategoriesLoaded, setCategories };
};
