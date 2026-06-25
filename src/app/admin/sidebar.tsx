import Link from "next/link";

export function Sidebar() {
  return (
    <div className=" fixed left-0 h-screen bg-zinc-400 border-r border-zinc-700 rounded-r-xl flex flex-col gap-2">
      <Link href={"/admin/categories"}>Категории</Link>
      <Link href={"/admin/products"}>Товары</Link>
    </div>
  );
}
