import z from "zod";

export const FormSchemaValues = z
  .object({
    fullName: z.string().min(1, "Nombre es campo obligatorio").optional(),
    email: z
      .string()
      .min(1, "Email es campo obligatorio")
      .email("Email no válido"),
    password: z.string().min(8, "Contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "Repetir contraseña debe tener al menos 8 caracteres")
      .optional(),
    handle: z
      .string()
      .min(1, "Nombre de usuario es campo obligatorio")
      .optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }
  );

export type FormValues = z.infer<typeof FormSchemaValues>;
export type HandleValue = Pick<FormValues, "handle">;

export const UserSchema = z.object({
  id: z.number().optional(),
  image: z.string().optional(),
  description: z.string(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  handle: z.string(),
  createdAt: z.string().optional(),
  links: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type DraftUser = Omit<User, "id" | "createdAt" | "email">;

const SocialMediaSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url("URL no válida").optional(),
  enabled: z.boolean().default(false),
});

export type SocialMedia = z.infer<typeof SocialMediaSchema>;
export type DraftSocialMedia = Omit<SocialMedia, "id">;
