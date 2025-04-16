import { RegisterForm, TitlePage } from "@/components";

export default function RegisterView() {
  return (
    <>
      <TitlePage
        title="Crear Cuenta"
        subtitle="Registra tu cuenta para comenzar a usar nuestra aplicación"
      />

      <RegisterForm />
    </>
  );
}
