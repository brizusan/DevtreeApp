import apiAxios from "@/api/axios";
import { User } from "@/schemas";
import { isAxiosError } from "axios";

export const updateProfileUser = async (formData: User) => {
  try {
    const { data } = await apiAxios.post("/user", formData);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      return error.response.data.message;
    }
  }
};

export const uploadImageUser = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiAxios.post("/user/image", formData);
    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      return error.response.data.message;
    }
  }
};
