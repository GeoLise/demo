"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import z from "zod";
import { authClient } from "~/lib/client/auth-client";

export default function SignUp() {
  const schema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const signUpMutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: z.infer<typeof schema>) => {
      await authClient.signIn.email(data);
    },
    onSuccess: () => {
      alert("Sign up successful");
    },
  });

  const form = useForm({
    defaultValues: {} as z.infer<typeof schema>,
    onSubmit: async ({ value }) => {
      signUpMutation.mutate(value);
    },
    validators: {
      onSubmit: schema,
    },
  });

  return (
    <div className=" container mx-auto p-10 bg-zinc-500">
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        <form.Field name="email">
          {(field) => (
            <div className="mb-2">
              {" "}
              <div className="mt-1">
                <input
                  type="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Email "
                />
              </div>
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <div className="mb-2">
              <div className="mt-1">
                <input
                  type="password"
                  placeholder="Password"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            </div>
          )}
        </form.Field>

        <form.Subscribe>
          {(state) => (
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {state.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
