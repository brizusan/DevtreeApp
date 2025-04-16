import apiAxios from "@/api/axios";
import { DraftUser, User } from "@/schemas";
import { isAxiosError } from "axios";

export const getUserByHandle = async (handle: User["handle"]) => {
  try {
    const { data } = await apiAxios.get<DraftUser>(`/user/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Unexpected error");
  }
};

export const getUserHandleAvaliable = async (handle: User["handle"]) => {
  try {
    const { data } = await apiAxios.post<DraftUser>(`/search`, { handle });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return error.response.data;
    }

    throw new Error("Unexpected error");
  }
};
