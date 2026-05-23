import { relations } from "drizzle-orm";
import * as pg from "drizzle-orm/pg-core";

export const commonFields = {
  id: pg
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  isDeleted: pg.boolean("is_deleted").default(false),
  createdAt: pg.timestamp("created_at").notNull().defaultNow(),
};

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
