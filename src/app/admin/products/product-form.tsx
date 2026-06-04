"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import z from "zod/v4";
import { api } from "~/app/lib/client/api";
import { queryClient } from "~/app/lib/client/query-client";
import { ProductSchema } from "~/app/lib/schemas/product";

export function ProductForm() {
  const createProductMutation = useMutation({
    mutationKey: ["create-products"],
    mutationFn: async (data: z.infer<typeof ProductSchema>) => {
      await api.products.post(data);
    },
    onSuccess: () => {
      alert("Продукт создан");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const productForm = useForm({
    defaultValues: {} as z.infer<typeof ProductSchema>,
    onSubmit: ({ value }) => {
      createProductMutation.mutate(value);
    },
    validators: {
      onSubmit: ProductSchema,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return (await api.categories.get()).data;
    },
  });

  return (
    <form
      className="flex flex-col gap-4 border border-zinc-500 p-4 rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        productForm.handleSubmit(e);
      }}
    >
      <productForm.Field name="name">
        {(field) => (
          <div className="flex flex-col">
            <input
              className="bg-zinc-500 border border-zinc-700 px-4 py-2 text-white placeholder:text-zinc-700"
              value={field.state.value}
              placeholder="Введите имя"
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.map((er) => (
              <p className="text-red-700" key={er?.message}>
                {er?.message}
              </p>
            ))}
          </div>
        )}
      </productForm.Field>
      <productForm.Field name="price">
        {(field) => (
          <div className="flex flex-col">
            <input
              className="bg-zinc-500 border border-zinc-700 px-4 py-2 text-white placeholder:text-zinc-700"
              value={field.state.value}
              placeholder="Введите цену"
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
            {field.state.meta.errors.map((er) => (
              <p className="text-red-700" key={er?.message}>
                {er?.message}
              </p>
            ))}
          </div>
        )}
      </productForm.Field>
      <productForm.Field name="categoryId">
        {(field) => (
          <div className="flex flex-col gap-1">
            <select onChange={(e) => field.handleChange(e.target.value)}>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {field.state.meta.errors.map((er) => (
              <p className="text-red-700" key={er?.message}>
                {er?.message}
              </p>
            ))}
          </div>
        )}
      </productForm.Field>
      <productForm.Subscribe>
        {(state) => (
          <button type="submit" className="px-10 py-2 rounded-lg bg-green-900">
            {state.canSubmit ? "Создать проукт" : "Че то не так"}
          </button>
        )}
      </productForm.Subscribe>
    </form>
  );
}
