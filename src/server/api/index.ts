import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { categoriesRouter } from "./routers/categories";
import { treaty } from "@elysiajs/eden";

export const app = new Elysia({
  prefix: "/api",
})
  .use(productsRouter)
  .use(categoriesRouter)
  .get("/", () => {
    return "hello world!";
  })
  .get("/test", () => {
    return "test test 123";
  });

export const api = treaty(app).api;

export type App = typeof app;
