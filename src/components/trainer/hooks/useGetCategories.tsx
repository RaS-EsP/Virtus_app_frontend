import React, { useEffect, useState } from "react";
import { URLS } from "../../../urls";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getAuthToken } from "./useIsAuthJwt";
export const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
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
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    GetCategories();
  }, []);

  return { categories };
};
