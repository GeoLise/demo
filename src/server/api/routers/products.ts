import { eq } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod/v4";
import { ProductSchema } from "~/lib/schemas/product";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";
import { userService } from "./user";

export const productsRouter = new Elysia({
  prefix: "/products",
})
  .use(userService)
  .get("/", async ({ session }) => {
    console.log(session);
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
  )
  .post(
    "/",
    async ({ body, status }) => {
      console.log(body);

      await db.insert(products).values(body);
    },
    {
      body: ProductSchema,
    },
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      await db.update(products).set(body).where(eq(products.id, params.id));
    },
    {
      body: ProductSchema,
      params: z.object({
        id: z.string(),
      }),
    },
  )
  .delete("/:id", async ({ params }) => {
    await db
      .update(products)
      .set({
        isDeleted: true,
      })
      .where(eq(products.id, params.id));
  });
