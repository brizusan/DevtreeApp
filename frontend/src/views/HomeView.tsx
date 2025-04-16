import { HeaderLayout } from "@/components";
import { useValidateHandler } from "@/hooks";
import { HandleValue } from "@/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

export const HomeView = () => {
  const { message, mutate } = useValidateHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<HandleValue>({
    defaultValues: {
      handle: "",
    },
  });

  const userHandle = watch("handle");

  const onHandleSubmit: SubmitHandler<HandleValue> = async (data) => {
    const slug = slugify(data.handle);
    mutate(slug);
  };

  return (
    <>
      <HeaderLayout />
      <main
        className="max-w-6xl mx-auto  lg:w-full py-10 flex justify-between
        md:bg-[url('/bg.svg')] md:bg-contain md:bg-no-repeat  bg-right-top min-h-[60vh]
      "
      >
        <section className="md:w-1/2 space-y-3  pl-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 ">
            Todas tus <span className="text-cyan-500">Redes Sociales</span> en
            un solo lugar
          </h1>
          <p className="text-lg text-slate-700 ">
            Unete a más de 1000 developers , compartiendo tus redes sociales.
            Comparte tu perfil de Linkedin, Twitter, Github, Instagram, etc.
          </p>
          <pre className="text-sm tracking-widest font-black text-blue-800 ">
            Que esperas ? para unirte a nuestros amigos
          </pre>

          <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-3">
            <div className="relative flex items-center  bg-white  px-2  border border-gray-300 rounded ">
              <label htmlFor="handle" className="font-medium">
                devtree.com/
              </label>
              <input
                type="text"
                id="handle"
                className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                placeholder="elonmusk, zuck, jeffbezos"
                {...register("handle", {
                  required: "Nombre de usuario es obligatorio",
                })}
              />
            </div>
            {errors.handle && (
              <p className="text-red-500 font-semibold text-sm">
                {errors.handle.message}
              </p>
            )}

            {message && message.tipo === "success" && (
              <p className="text-slate-500 font-semibold text-sm">
                {`El alias ${userHandle} esta disponible`}{" "}
                <Link
                  className="text-blue-600 font-semibold text-sm underline"
                  to={`/auth/register`}
                  state={{ handle: slugify(userHandle) }}
                >
                  {" "}
                  Deseas unirte al club?
                </Link>
              </p>
            )}

            {message && message.tipo === "error" && (
              <p className="text-red-500 font-semibold text-sm">
                {message.message}
              </p>
            )}

            <input
              type="submit"
              className="bg-cyan-500 shadow border-none hover:bg-cyan-600 shadow-cyan-500 py-1.5 px-4 text-lg  capitalize text-slate-200 rounded font-semibol cursor-pointer"
              value="Obtener tu perfil"
            />
          </form>
        </section>

        {/* <section>bg-aca</section> */}
      </main>
    </>
  );
};
