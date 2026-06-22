import { relations } from "drizzle-orm";
import * as pg from "drizzle-orm/pg-core";
import { commonFields } from "./utils";
export * from "./auth-schema";
export * from "./file";

export const products = pg.pgTable("products", {
  ...commonFields,
  name: pg.varchar("name", { length: 255 }).notNull(),
  price: pg.integer("price").notNull(),
  categoryId: pg
    .varchar("category_id", { length: 255 })
    .notNull()
    .references(() => categories.id),
});

export const categories = pg.pgTable("categories", {
  ...commonFields,
  name: pg.varchar("name", { length: 255 }).notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    references: [categories.id],
    fields: [products.categoryId],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
