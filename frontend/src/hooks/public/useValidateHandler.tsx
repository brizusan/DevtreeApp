import { getUserHandleAvaliable } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useValidateHandler = () => {
  const [message, setMessage] = useState({
    message: "",
    tipo: "",
  });
  const { mutate } = useMutation({
    mutationFn: getUserHandleAvaliable,
    onSuccess: (data) => {
      if (data.message === "Alias user avaliable") {
        setMessage({ message: "Alias user avaliable", tipo: "success" });
      } else {
        setMessage({ message: "Alias user not avaliable", tipo: "error" });
        setTimeout(() => {
          setMessage({ message: "", tipo: "" });
        }, 1500);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    message,
    mutate,
  };
};
