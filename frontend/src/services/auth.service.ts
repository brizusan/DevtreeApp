import { User, type FormValues } from "@/schemas";
import { isAxiosError } from "axios";
import apiAxios from "../api/axios";

export const registerData = async (formData: FormValues) => {
  try {
    const { data } = await apiAxios.post("/auth/register", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data.message;
    }
  }
};

export const loginUser = async (formData: FormValues) => {
  try {
    const { data } = await apiAxios.post<string>("/auth/login", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data.message;
    }
  }
};

export const getUser = async () => {
  try {
    const { data } = await apiAxios.get<User>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data.message;
    }
  }
};
