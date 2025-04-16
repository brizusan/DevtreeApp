import { FormSchemaValues, FormValues } from "@/schemas";
import { loginUser } from "@/services/auth.service";
import { waitSleep } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InputForm } from "./InputForm";

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(FormSchemaValues),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const res = await loginUser(formData);
    localStorage.setItem("token", res.token);
    if (res.message === "Logged in successfully") {
      toast.success("Sesión iniciada exitosamente");
      await waitSleep(1500);
      navigate("/admin", { replace: true });
    } else {
      toast.error(res);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 max-w-md mx-auto my-6 border bg-white p-6 rounded"
    >
      <legend className="text-center text-slate-500 font-semibold">
        Formulario de Acceso
      </legend>

      <InputForm
        name="email"
        control={control}
        label="Email"
        type="email"
        error={errors.email}
      />

      <InputForm
        name="password"
        control={control}
        label="Contraseña"
        type="password"
        error={errors.password}
      />
      <div className="flex justify-center mt-4">
        <input
          type="submit"
          className="px-12 py-1.5 bg-slate-600 hover:bg-slate-700 cursor-pointer font-semibold text-white text-sm uppercase rounded "
          value={"Ingresar"}
        />
      </div>
    </form>
  );
};
