import { LoginForm, TitlePage } from "@/components";

export default function LoginView() {
  return (
    <>
      <TitlePage
        title="Iniciar Sesión"
        subtitle="Ingresa a tu cuenta , completando el siguiente formulario"
      />

      <LoginForm />
    </>
  );
}
