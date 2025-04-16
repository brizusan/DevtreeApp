import { FormSchemaValues, FormValues } from "@/schemas";
import { registerData } from "@/services/auth.service";
import { waitSleep } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InputForm } from "./InputForm";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  handle: "",
};

export const RegisterForm = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const {
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      ...initialValues,
      handle: location.state?.handle ?? "",
    },
    resolver: zodResolver(FormSchemaValues),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { confirmPassword, ...formData } = data;

    const res = await registerData(formData);

    if (res.message === "User created successfully") {
      toast.success("Usuario creado exitosamente");
      reset();
      await waitSleep(1500);
      navigate("/auth/login");
    } else {
      toast.error(res);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 max-w-md mx-auto my-6 border bg-white px-8 py-10 rounded"
    >
      <legend className="text-center text-slate-500 font-semibold">
        Formulario de Registro
      </legend>
      <InputForm
        name="fullName"
        control={control}
        label="Nombre Completo"
        type="text"
        error={errors.fullName}
      />
      <InputForm
        name="email"
        control={control}
        label="Email"
        type="email"
        error={errors.email}
      />

      <InputForm
        name="handle"
        control={control}
        label="Nombre de Usuario"
        type="text"
        error={errors.handle}
      />
      <InputForm
        name="password"
        control={control}
        label="Contraseña"
        type="password"
        error={errors.password}
      />
      <InputForm
        name="confirmPassword"
        control={control}
        label="Confirmar Contraseña"
        type="password"
        error={errors.confirmPassword}
      />

      <div className="flex justify-center mt-4">
        <input
          type="submit"
          className="px-12 py-1.5 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white uppercase rounded "
          value={"Registrar"}
        />
      </div>
    </form>
  );
};
