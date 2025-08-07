"use client";

import type { getMedicine } from "@madhuprema/schema/medicine";
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
import { useGetAllMedicines } from "@/features/medicine/hooks/getAllMedicine";
import { cn } from "@/lib/utils";
import { useDeleteMedicine } from "../hooks/deleteMedicine";

type MedicineType = z.infer<typeof getMedicine.getAllMedicineRes>[number];

const columns: ColumnDef<MedicineType>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Name",
    cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
    filterFn: "includesString",
    size: 100,
  },
  {
    accessorKey: "medicineType",
    id: "medicineType",
    header: "Medicine Type",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.medicineType}</span>
    ),
    enableGlobalFilter: false,
    size: 40,
  },
  {
    id: "deleteMedicine",
    header: "Delete Medicine",
    cell: function Cell({ row }) {
      const queryClient = useQueryClient();
      const { mutate: deleteMedicine } = useDeleteMedicine(
        { id: row.original.id },
        {
          onSettled: (data) => {
            if (data) {
              toast.success("Medicine deleted successfully");
              void queryClient.invalidateQueries({ queryKey: ["medicine"] });
              return;
            }
            toast.error("Something went wrong");
          },
        },
      );
      return (
        <Button
          onClick={() => deleteMedicine()}
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

const MedicineList = ({ className }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 19,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [debouncedValue] = useDebounceValue(globalFilter, 500);

  const { data: medicine } = useGetAllMedicines({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    search: debouncedValue,
  });

  const table = useReactTable({
    data: medicine ?? [],
    columns: columns,
    rowCount: medicine?.length ?? 0,

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

  return <StatefulTable className={cn("h-[800px]", className)} table={table} />;
};

export default MedicineList;
