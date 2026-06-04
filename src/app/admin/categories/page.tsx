import { api } from "~/server/api";
import { CategoryForm } from "./category-form";

export default async function CategoriesPage() {
  const categories = (await api.categories.get()).data;

  return (
    <div className=" container mx-auto bg-zinc-800 flex flex-row gap-10">
      <div className="flex flex-col gap-2">
        <h1>Категории</h1>
        {categories?.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col gap-1 p-4 rounded-xl border border-black bg-zinc-600 w-fit"
          >
            <p>{cat.id}</p>
            <h2>{cat.name}</h2>
            <p>{cat.createdAt.toISOString()}</p>
          </div>
        ))}
      </div>
      <CategoryForm />
    </div>
  );
}
