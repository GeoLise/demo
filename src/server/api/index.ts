import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { categoriesRouter } from "./routers/categories";

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
