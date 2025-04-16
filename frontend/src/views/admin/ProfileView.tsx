import { ErrorMessage } from "@/components";
import { useFetchUser, useUpdateProfile, useUploadImage } from "@/hooks";
import { User } from "@/schemas";
import { SubmitHandler, useForm } from "react-hook-form";

const initialState = {
  handle: "",
  description: "",
  image: "",
};

export default function ProfileView() {
  const { cacheUser } = useFetchUser();
  const { mutation, message } = useUpdateProfile();
  const { error, mutation: uploadMutation } = useUploadImage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialState,
      handle: cacheUser.handle,
      description: cacheUser.description,
    },
  });

  const onSubmitForm: SubmitHandler<User> = (dataForm) => {
    mutation.mutate(dataForm);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="bg-white p-10 rounded-lg space-y-5"
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Alias o Nombre usuario:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", {
            required: "Alias es campo obligatorio",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "Descripción es campo obligatorio",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="max-w-md mx-auto">
        <label className="text-base text-slate-700 font-normal mb-3 block">
          Upload file{" "}
          <span className="text-blue-500">
            {uploadMutation.isSuccess && "Imagen cargada"}
          </span>
        </label>
        <input
          type="file"
          className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded"
          onChange={(e) => {
            uploadMutation.mutate(e.target.files![0]);
          }}
        />
        {error && (
          <span className="text-red-500 text-sm font-medium italic">
            {error}
          </span>
        )}
        <p className="text-xs text-slate-500 mt-2">PNG, JPG SVG, and WEBP.</p>
      </div>
      {message && (
        <p className="text-blue-500 text-center font-semibold">{message}</p>
      )}
      <input
        type="submit"
        disabled={mutation.isPending}
        className="bg-cyan-600 disabled:opacity-50  hover:bg-cyan-700 p-2  w-full uppercase text-slate-100 rounded-lg font-semibold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
