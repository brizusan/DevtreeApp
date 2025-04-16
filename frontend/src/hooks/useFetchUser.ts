import { User } from "@/schemas";
import { getUser } from "@/services/auth.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchUser = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const cacheUser: User = queryClient.getQueryData(["user"])!;

  return {
    data,
    cacheUser,
    isLoading,
    isError,
  };
};
