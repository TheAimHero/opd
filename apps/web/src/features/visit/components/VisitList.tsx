import { getVisit } from "@madhuprema/schema/visit";
import { useQueryClient } from "@tanstack/react-query";
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAtomValue } from "jotai";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import type z from "zod";
import SimpleTable from "@/components/table/SimpleTable";
import { Badge } from "@/components/ui/badge";
import { useGetPatient } from "@/features/patients/hooks/getPatient";
import { useDeleteVisit } from "@/features/visit/hooks/deleteVisit";
import { useGetAllVisit } from "@/features/visit/hooks/getAllVisit";
import { dateRangeAtom, searchAtom } from "@/features/visit/state/search";
import { formatShortIndianDate } from "@/lib/date";
import PrintVisit from "./PrintVisit";

const { getAllVisitRes } = getVisit;
type Visit = z.infer<typeof getAllVisitRes>[number];

const columns: ColumnDef<Visit>[] = [
  {
    id: "patientId",
    header: "ID",
    cell: function Cell({ row }) {
      const { data: patient } = useGetPatient({ id: row.original.patientId });
      return <span>{patient?.id}</span>;
    },
  },
  {
    id: "patientName",
    header: "Name",
    cell: function Cell({ row }) {
      const { data: patient } = useGetPatient({ id: row.original.patientId });
      return <span>{patient?.name}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Visit Date",
    cell: ({ row }) =>
      row.original.createdAt
        ? formatShortIndianDate(row.original.createdAt)
        : "N/A",
  },
  {
    id: "patientPhoneNumber",
    header: "Phone Number",
    cell: function Cell({ row }) {
      const { data: patient } = useGetPatient({ id: row.original.patientId });
      return <span>{patient?.phoneNumber}</span>;
    },
  },
  {
    id: "patientAddress",
    header: "Address",
    cell: function Cell({ row }) {
      const { data: patient } = useGetPatient({ id: row.original.patientId });
      return <span>{patient?.address}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: function Cell({ row }) {
      const queryClient = useQueryClient();
      const { mutate: deleteVisit } = useDeleteVisit(
        { id: row.original.id },
        {
          onSettled: (_data, error) => {
            console.log(error);
            if (!error) {
              toast.success("Visit deleted successfully");
              void queryClient.invalidateQueries({ queryKey: ["visit"] });
            } else {
              toast.error("Something went wrong");
            }
          },
        },
      );
      return (
        <div className="flex gap-2 antialiased">
          <Badge
            className="cursor-pointer select-none"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              deleteVisit();
            }}
          >
            Delete
          </Badge>
          <PrintVisit
            visitData={{
              ...row.original,
              createdAt: row.original.createdAt || new Date(),
            }}
          />
        </div>
      );
    },
  },
];

interface Props {
  className?: string;
}

const VisitList = ({ className }: Props) => {
  const router = useRouter();
  const searchTerm = useAtomValue(searchAtom);
  const range = useAtomValue(dateRangeAtom);

  const { data } = useGetAllVisit({
    search: searchTerm,
    start: range?.from,
    end: range?.to,
    limit: 15,
  });

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    rowCount: data?.length ?? 0,

    getCoreRowModel: getCoreRowModel(),

    state: {},
  });
  return (
    <SimpleTable
      table={table}
      className={className}
      onRowClick={(row) => router.push(`/visit/${row.original.id}`)}
    />
  );
};

export default VisitList;
