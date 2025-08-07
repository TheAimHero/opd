"use client";

import type { getTest } from "@madhuprema/schema/test";
import { useQueryClient } from "@tanstack/react-query";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";
import type z from "zod";
import StatefulTable from "@/components/table/StatefulTable";
import { Button } from "@/components/ui/button";
import { useDeleteTest } from "@/features/test/hooks/deleteTest";
import { useGetAllTest } from "@/features/test/hooks/getAllTest";
import { cn } from "@/lib/utils";

type TestType = z.infer<typeof getTest.getAllTestRes>[number];

const columns: ColumnDef<TestType>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Name",
    cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
    filterFn: "includesString",
    size: 100,
  },
  {
    id: "deleteTest",
    header: "Delete Test",
    cell: function Cell({ row }) {
      const queryClient = useQueryClient();
      const { mutate: deleteTest } = useDeleteTest(
        { id: row.original.id },
        {
          onSettled: (data) => {
            if (data) {
              toast.success("Test deleted successfully");
              void queryClient.invalidateQueries({ queryKey: ["test"] });
              return;
            }
            toast.error("Something went wrong");
          },
        },
      );
      return (
        <Button
          onClick={() => deleteTest()}
          size="icon"
          variant="ghost"
          type="button"
          className="text-destructive capitalize hover:bg-destructive/40 hover:text-black"
        >
          <Trash2Icon />
        </Button>
      );
    },
  },
];

interface Props {
  className?: string;
}

const TestList = ({ className }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 19,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [debouncedValue] = useDebounceValue(globalFilter, 500);

  const { data: test } = useGetAllTest({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    search: debouncedValue,
  });

  const table = useReactTable({
    data: test ?? [],
    columns: columns,
    rowCount: test?.length ?? 0,

    globalFilterFn: "includesString",

    enableColumnFilters: true, // this is required to be able to filter columns
    enableGlobalFilter: true, // this is required to be able to filter the table

    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.name, // unique id for each row

    state: {
      pagination,
      globalFilter,
    }, // table states
  });

  return (
    <StatefulTable
      className={cn("h-[800px]", className)}
      onFilterChange={(v) => console.log(v)}
      onSelectedRowChange={(rows) => console.log(rows.map((r) => r.original))}
      table={table}
    />
  );
};

export default TestList;
