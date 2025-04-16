import { updateProfileUser } from "@/services/admin.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSocials = () => {
  const { mutate } = useMutation({
    mutationFn: updateProfileUser,
    onSuccess: () => {
      toast.success("update social media links");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate };
};
