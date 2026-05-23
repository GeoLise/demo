import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { categories, products } from "~/server/db/schema";

// const foundProducts = await db.query.products.findMany();

// console.log(foundProducts);

// await db.insert(products).values({
//   name: "product2",
//   price: 222,
//   categoryId: "019e564b-ca09-7000-a142-071d3cc75abf",
// });

// await db.insert(products).values({
//   name: "product3",
//   price: 333,
//   categoryId: "019e564b-ca09-7000-a142-071d3cc75abf",
// });

// await db
//   .update(products)
//   .set({
//     name: "product1111111111",
//   })
//   .where(eq(products.id, "019e564e-4993-7000-8a2b-f9032200f8a6"));

// await db
//   .update(products)
//   .set({
//     isDeleted: true,
//   })
//   .where(eq(products.id, "019e564e-4993-7000-8a2b-f9032200f8a6"));

const productsWithCategory = await db.query.products.findMany({
  where: eq(products.isDeleted, false),
  with: {
    category: true,
  },
});

// console.log(productsWithCategory);

// const categoryWithProducts = await db.query.categories.findMany({
//   where: eq(categories.isDeleted, false),
//   with: {
//     products: {
//       where: eq(products.isDeleted, false),
//     },
//   },
// });

// console.log(categoryWithProducts);

const category = await db.query.categories.findFirst({
  where: eq(categories.id, "019e564b-ca09-7000-a142-071d3cc75abf"),
  with: {
    products: {
      where: eq(products.isDeleted, false),
    },
  },
});

console.log(category);
