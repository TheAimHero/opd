import { schema } from '@opd/db_schema/prescribedTest';
import {
  type ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type z from 'zod';
import SimpleTable from '@/components/table/SimpleTable';
import { Badge } from '@/components/ui/badge';
import { useGetTests } from '../hooks/getTest';

const modSchema = schema.prescribedTestInsertSchema.omit({ visitId: true });

type PrescribedTest = z.infer<typeof modSchema>;

const columnHelper = createColumnHelper<PrescribedTest>();

const columns = (
  onRemove?: (index: number) => void
): ColumnDef<PrescribedTest>[] => [
  {
    accessorKey: 'testId',
    id: 'id',
    header: 'Name',
    cell({ row }) {
      const { data: test } = useGetTests({ id: row.original.testId });
      return <span className="capitalize">{test?.name}</span>;
    },
    size: 100,
  },
  ...(onRemove
    ? [
        columnHelper.display({
          id: 'actions',
          header: 'Actions',
          cell: ({ row }) => (
            <div>
              <Badge
                className="cursor-pointer select-none"
                onClick={() => onRemove(row.index)}
                variant="destructive"
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
  data: PrescribedTest[];
  onRemove?: (index: number) => void;
}

const PrescribedTestTable = ({ data, className, onRemove }: Props) => {
  const table = useReactTable({
    data: data ?? [],
    columns: columns(onRemove),
    rowCount: data?.length ?? 0,

    getCoreRowModel: getCoreRowModel(),
  });
  return <SimpleTable className={className} table={table} />;
};

export default PrescribedTestTable;
