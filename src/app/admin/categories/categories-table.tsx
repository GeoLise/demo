"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/lib/client/api";
import { queryClient } from "~/lib/client/query-client";
import { Category } from "~/lib/types/category";
import { CreateUpdateCategory } from "./create-update";

export function CategoriesTable({ initialData }: { initialData: Category[] }) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return (await api.categories.get()).data;
    },
    initialData: initialData,
  });

  return <DataTable columns={colums} data={categories ?? initialData} />;
}

const colums: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Название",
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Дата создания",
    cell: ({ row }) => <p>{row.original.createdAt.toUTCString()}</p>,
  },
  {
    accessorKey: "actions",
    header: () => <CreateUpdateCategory />,
    cell: ({ row }) => (
      <div>
        <DeleteCategory category={row.original} />
        <CreateUpdateCategory category={row.original} />
      </div>
    ),
  },
];

function DeleteCategory({ category }: { category: Category }) {
  const deleteMutation = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: async () => {
      await api.categories({ id: category.id }).delete();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Категория успешно удалена");
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"destructive"}>Удалить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить категорию</DialogTitle>
        </DialogHeader>
        <p>Вы уверены, что хотите удалить категорию {category.name}?</p>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Отмена</Button>
          </DialogClose>
          <Button
            onClick={() => deleteMutation.mutate()}
            variant={"destructive"}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
