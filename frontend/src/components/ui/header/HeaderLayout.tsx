import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type Props = {
  isAdmin?: boolean;
};

export const HeaderLayout = ({ isAdmin }: Props) => {
  const queryClient = useQueryClient();
  const logout = () => {
    const confirm = window.confirm("¿Estas seguro que deseas cerrar sesión?");
    if (!confirm) return;
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <header className="bg-slate-800 py-5">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
        <Link to={`/`} className="w-92 p-5 lg:p-0 md:w-1/4 ">
          <img src="/logo.svg" className="w-full block" />
        </Link>

        {isAdmin && (
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-red-500 py-2 px-4 rounded text-slate-100 uppercase font-black text-xs  cursor-pointer"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        )}

        {!isAdmin && <NavbarNavigation />}
      </div>
    </header>
  );
};

const NavbarNavigation = () => {
  return (
    <div className="flex justify-end gap-4">
      <Link
        to={`/auth/login`}
        className="px-4 py-2 rounded text-slate-100 bg-slate-600 hover:bg-slate-700 uppercase font-semibold text-xs  cursor-pointer"
      >
        {" "}
        Iniciar Sesión
      </Link>

      <Link
        to={`/auth/register`}
        className="px-4 py-2 rounded text-slate-100 bg-blue-600 hover:bg-blue-700 uppercase font-semibold text-xs  cursor-pointer"
      >
        {" "}
        Registrarse
      </Link>
    </div>
  );
};
