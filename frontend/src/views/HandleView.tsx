import { UserData } from "@/components";
import { getUserByHandle } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function HandleView() {
  const { handle } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", handle],
    queryFn: () => getUserByHandle(handle!),
  });

  if (isLoading)
    return <div className="text-white antialiased font-medium">Loading...</div>;
  if (isError) <Navigate to={`/404`} />;

  if (data) return <UserData data={data} />;
}
