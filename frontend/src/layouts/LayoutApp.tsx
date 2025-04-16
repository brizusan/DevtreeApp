import { HeaderLayout, NavigationTabs, SocialDashoard } from "@/components";
import { useFetchUser } from "@/hooks";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function LayoutApp() {
  const { data, isLoading, isError } = useFetchUser();
  if (isError) return <Navigate to="/auth/login" replace />;
  if (data === "Unauthorized") return <Navigate to="/auth/login" replace />;

  return (
    <>
      <HeaderLayout isAdmin />
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-semibold text-right text-blue-500 text-2xl underline-offset-4 underline hover:no-underline"
              to={`/${data?.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              vista previa : <span className="capitalize">{data?.handle}</span>
            </Link>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col items-start md:flex-row gap-10 mt-10  ">
              <div className="flex-1 ">
                <Outlet />
              </div>
              <SocialDashoard data={data} />
            </div>
          )}
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
