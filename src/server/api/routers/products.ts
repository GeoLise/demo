import { eq } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod/v4";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";

export const productsRouter = new Elysia({
  prefix: "/products",
})
  .get("/", async () => {
    const foundProducts = await db.query.products.findMany({
      where: eq(products.isDeleted, false),
    });
    return foundProducts;
  })
  .get(
    "/:id",
    async ({ params }) => {
      const foundedProduct = await db.query.products.findFirst({
        where: eq(products.id, params.id),
      });

      return foundedProduct ?? null;
    },
    {
      params: z.object({
        id: z.string(),
      }),
    },
  );
