import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { categoriesRouter } from "./routers/categories";
import { treaty } from "@elysiajs/eden";
import { auth } from "../auth/auth";

export const app = new Elysia({
  prefix: "/api",
})
  .mount(auth.handler)
  .onError((e) => {
    console.error(e);
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
