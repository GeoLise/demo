import { z } from "zod/v4";

export const statusEnum = z.enum(["ACTIVE", "EXITED"]);

export const ProductSchema = z.object({
  name: z.string({ message: "Введите название" }),
  price: z.number({ message: "Введите цену " }),
  categoryId: z.string({ message: "Выберите категорию" }),
  status: statusEnum,
});
