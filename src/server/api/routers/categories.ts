import { and, eq } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod/v4";
import { CategorySchema } from "~/app/lib/schemas/category";
import { db } from "~/server/db";
import { categories, products } from "~/server/db/schema";

export const categoriesRouter = new Elysia({
  prefix: "/categories",
})
  .get("/", async () => {
    return await db.query.categories.findMany({
      where: eq(categories.isDeleted, false),
    });
  })
  .get(
    "/:id",
    async ({ params }) => {
      return await db.query.categories.findFirst({
        where: and(
          eq(categories.id, params.id),
          eq(categories.isDeleted, false),
        ),
      });
    },
    {
      params: z.object({
        id: z.string(),
      }),
    },
  )
  .post(
    "/",
    async ({ body }) => {
      await db.insert(categories).values({
        name: body.name,
      });
    },
    {
      body: CategorySchema,
    },
  )
  .put(
    "/:id",
    async ({ body, params }) => {
      await db.update(categories).set(body).where(eq(categories.id, params.id));
    },
    {
      body: CategorySchema,
      params: z.object({
        id: z.string(),
      }),
    },
  )
  .delete("/:id", async ({ params }) => {
    await db
      .update(categories)
      .set({
        isDeleted: true,
      })
      .where(eq(categories.id, params.id));

    await db
      .update(products)
      .set({
        isDeleted: true,
      })
      .where(eq(products.categoryId, params.id));
  });
