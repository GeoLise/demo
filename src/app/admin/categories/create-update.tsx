"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod/v4";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { api } from "~/lib/client/api";
import { queryClient } from "~/lib/client/query-client";
import { CategorySchema } from "~/lib/schemas/category";
import { Category } from "~/lib/types/category";

export function CreateUpdateCategory({ category }: { category?: Category }) {
  const [isOpen, setIsOpen] = useState(false);

  const createMutation = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (data: z.infer<typeof CategorySchema>) => {
      await api.categories.post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Категория успешно создана");
      form.reset();
      setIsOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: async (data: z.infer<typeof CategorySchema>) => {
      await api.categories({ id: category!.id }).put(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Категория успешно обновлена");
      form.reset();
      setIsOpen(false);
    },
  });

  const form = useForm({
    defaultValues: {
      ...category,
    } as z.infer<typeof CategorySchema>,
    onSubmit: async ({ value }) => {
      if (category) {
        await updateMutation.mutate(value);
      } else {
        await createMutation.mutate(value);
      }
    },
    validators: {
      onSubmit: CategorySchema,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant={"outline"}>
          {category ? "Редактировать" : "Создать"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Редактирование категории" : "Создание категории"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <div>
                <p>Имя</p>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Введите имя"
                  errors={field.state.meta.errors.flatMap(
                    (e) => e?.message ?? "",
                  )}
                />
              </div>
            )}
          </form.Field>

          <form.Subscribe>
            {(formState) => (
              <Button
                disabled={
                  !formState.canSubmit ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
              >
                {category ? "Обновить" : "Создать"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
