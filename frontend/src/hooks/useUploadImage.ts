import { User } from "@/schemas";
import { uploadImageUser } from "@/services/admin.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: uploadImageUser,
    onSuccess: (data) => {
      // optimistic update
      setImage(data);
      queryClient.setQueryData(["user"], (prevState: User) => {
        return {
          ...prevState,
          image: data,
        };
      });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return {
    mutation,
    image,
    error,
  };
};
