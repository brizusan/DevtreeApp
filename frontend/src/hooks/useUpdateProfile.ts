import { updateProfileUser } from "@/services/admin.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: updateProfileUser,
    onError: (error) => {
      setMessage(error.message);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    },
    onSuccess: (data) => {
      setMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setTimeout(() => {
        setMessage("");
      }, 1500);
    },
  });

  return {
    mutation,
    message,
  };
};
