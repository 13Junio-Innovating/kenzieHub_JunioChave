import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Digite um email válido" })
    .nonempty({ message: "Campo obrigatório, digite seu email de login" }),
  password: z.string().nonempty({ message: "Campo obrigatório, digite sua senha de login" }),
});