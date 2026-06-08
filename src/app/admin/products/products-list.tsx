"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "~/lib/client/api";

export function ProductsList() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return (await api.products.get()).data;
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {isLoading && <p className="text-4xl">Продукты грузятся...</p>}
      {products?.map((prod) => (
        <div
          key={prod.id}
          className="flex flex-col gap-2 bg-zinc-700 border border-white p-4"
        >
          <p>{prod.name}</p>
          <p>{prod.createdAt.toDateString()}</p>
        </div>
      ))}
    </div>
  );
}
