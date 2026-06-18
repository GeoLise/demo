import Elysia from "elysia";
import { auth } from "~/server/auth/auth";

export const userService = new Elysia({ name: "user/service" })
  .derive({ as: "global" }, async ({ request }) => {
    const betterAuthSession = await auth.api.getSession({
      headers: request.headers,
    });

    return {
      session: betterAuthSession,
    };
  })
  .macro({
    isSignedIn: (enabled?: boolean) => {
      if (!enabled) return;

      return {
        beforeHandle({ session, status }) {
          if (!session?.user) {
            return status(401, "Вам необходимо авторизоваться");
          }
        },
      };
    },
    isAdmin: (enabled?: boolean) => {
      if (!enabled) return;

      return {
        beforeHandle({ session, status }) {
          if (session!.user!.role === "ADMIN") {
            return status(
              403,
              "Вам необходимо авторизоваться как администратор",
            );
          }
        },
      };
    },
  });
