import Elysia from "elysia";
import { productsRouter } from "./routers/products";
import { categoriesRouter } from "./routers/categories";
import { treaty } from "@elysiajs/eden";
import { auth } from "../auth/auth";
import { filesRouter } from "./routers/files";

export const app = new Elysia({
  prefix: "/api",
})
  .get("/ping", () => {
    return "Hello";
  })
  .mount(auth.handler)
  .onError((e) => {
    console.error(e);
  })
  .use(productsRouter)
  .use(categoriesRouter)
  .use(filesRouter)
  .get("/", () => {
    return "hello world!";
  })
  .get("/test", () => {
    return "test test 123";
  });

export const api = treaty(app).api;

export type App = typeof app;
