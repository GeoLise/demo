import { ProductForm } from "./product-form";
import { ProductsList } from "./products-list";

export default function ProductsPage() {
  return (
    <div className="flex flex-row gap-4 container mx-auto pt-20">
      <ProductsList />
      <ProductForm />
    </div>
  );
}
