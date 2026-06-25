import { z } from "zod/v4";

export const CategorySchema = z.object({
  name: z
    .string({ message: "Введите имя" })
    .min(2, { message: "Имя должно содержать минимум 2 буквы" }),
});
