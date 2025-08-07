'use client';

import type { getSurgery } from '@opd/schema/surgery';
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import type z from 'zod';
import StatefulTable from '@/components/table/StatefulTable';
import { useGetAllSurgery } from '@/features/surgery/hooks/getSurgery';
import { cn } from '@/lib/utils';

type SurgeryType = z.infer<typeof getSurgery.getAllSurgeryRes>[number];

const columns: ColumnDef<SurgeryType>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
    filterFn: 'includesString',
    size: 100,
  },
];

interface Props {
  className?: string;
}

const SurgeryList = ({ className }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 19,
  });
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const [debouncedValue] = useDebounceValue(globalFilter, 500);

  const { data: surgery } = useGetAllSurgery({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    search: debouncedValue,
  });

  const table = useReactTable({
    data: surgery ?? [],
    columns,
    rowCount: surgery?.length ?? 0,

    globalFilterFn: 'includesString',

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
      className={cn('h-[800px]', className)}
      onFilterChange={(_v) => {}}
      onSelectedRowChange={(_rows) => {}}
      table={table}
    />
  );
};

export default SurgeryList;
