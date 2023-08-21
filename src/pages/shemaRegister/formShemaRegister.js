import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty({ message: "Campo obrigatório" }),
    email: z.string().email({ message: "Email obrigatório" }),
    password: z
      .string()
      .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número."),
    confirmPassword: z.string(),
    contact: z
      .string()
      .regex(
        /^(?:\d{10,}|https?:\/\/(?:www\.)?(?:facebook|twitter|instagram)\.com\/\w+)$/,
        "Informe um número de telefone válido ou um link de rede social"
      ),
    course_module: z
      .string()
      .refine(
        (value) =>
          [
            "Primeiro módulo (Introdução ao Frontend)",
            "Segundo módulo (Frontend Avançado)",
            "Terceiro módulo (Introdução ao Backend)",
            "Quarto módulo (Backend Avançado)",
          ].includes(value),
        "Informe um módulo de curso válido"
      ),
      bio: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });
