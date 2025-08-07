import { schema } from "@madhuprema/db_schema/prescribedMedicine";
import {
  type ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type z from "zod";
import SimpleTable from "@/components/table/SimpleTable";
import { Badge } from "@/components/ui/badge";
import { useGetMedicines } from "../hooks/getMedicine";

const modSchema = schema.prescribedMedicineInsertSchema.omit({ visitId: true });

type PrescribedMedicine = z.infer<typeof modSchema>;

const columnHelper = createColumnHelper<PrescribedMedicine>();

const columns = (
  onRemove?: (index: number) => void,
): ColumnDef<PrescribedMedicine>[] => [
  {
    accessorKey: "medicineId",
    id: "id",
    header: "Name",
    cell: function Cell({ row }) {
      const { data: medicine } = useGetMedicines({
        id: row.original.medicineId,
      });
      return <span className="capitalize">{medicine?.name}</span>;
    },
  },
  {
    accessorKey: "morning",
    id: "morning",
    header: "Morning",
    cell: ({ row }) => row.original.morning,
  },
  {
    accessorKey: "afternoon",
    id: "afternoon",
    header: "Afternoon",
    cell: ({ row }) => row.original.morning,
  },
  {
    accessorKey: "evening",
    id: "evening",
    header: "Evening",
    cell: ({ row }) => row.original.evening,
  },
  {
    accessorKey: "note",
    id: "note",
    header: "Note",
    cell: ({ row }) => row.original.note,
  },
  ...(onRemove
    ? [
        columnHelper.display({
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <div>
              <Badge
                variant="destructive"
                onClick={() => onRemove(row.index)}
                className="cursor-pointer select-none"
              >
                Delete
              </Badge>
            </div>
          ),
        }),
      ]
    : []),
];

interface Props {
  className?: string;
  data: PrescribedMedicine[];
  onRemove?: (index: number) => void;
}

const PrescribedMedicineTable = ({ data, className, onRemove }: Props) => {
  const table = useReactTable({
    data: data ?? [],
    columns: columns(onRemove),
    rowCount: data?.length ?? 0,

    getCoreRowModel: getCoreRowModel(),
  });
  return <SimpleTable table={table} className={className} />;
};

export default PrescribedMedicineTable;
