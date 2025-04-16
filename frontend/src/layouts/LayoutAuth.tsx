import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

export default function LayoutAuth() {
  const location = useLocation();

  const isAuthRoute = location.pathname.includes("auth");

  return (
    <>
      <div className="bg-gradient-to-tr from-slate-800 to-slate-900 min-h-screen">
        <div className="flex justify-center py-8 ">
          {/* <Link to={`/`}> */}
          <img src={`/logo.svg`} alt="logo" className="w-80  h-auto" />
          {/* </Link> */}
        </div>
        <main className="max-w-7xl mx-auto w-11/12 lg:w-full my-12">
          <Outlet />
        </main>
        {isAuthRoute && (
          <footer className="pb-6">
            <nav className="flex justify-center gap-8">
              <Link
                className="text-white text-sm hover:text-blue-400"
                to="/auth/login"
              >
                Tienes una cuenta? accede
              </Link>
              <Link
                className="text-white text-sm hover:text-blue-400"
                to="/auth/register"
              >
                No tienes una cuenta? regístrate
              </Link>
            </nav>
          </footer>
        )}
      </div>

      <Toaster richColors position="top-right" />
    </>
  );
}
