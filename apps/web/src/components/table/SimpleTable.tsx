"use client";

import {
  flexRender,
  type Row,
  type Table as TableType,
} from "@tanstack/react-table";
import { Loader2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * This is the interface that is used by the snippet and is to be satisfied when using the Snippet after copying it.
 */
interface Props<TData> {
  table: TableType<TData>;
  onRowClick?: (row: Row<TData>) => void | Promise<void>;
  isDataLoading?: boolean;
  className?: string;
}

/**
 * This is a simple table built with snadcn/ui and tanstack/react-table.
 *
 * @param table - The table instance created by useReactTable
 * @param className - The className to be applied to the surrounding div
 * @param isDataLoading - The loading state of the data
 * @param onRowClick - The event handler for when a row is clicked
 *
 * @see https://ui.shadcn.com/docs/components/table
 * @see https://ui.shadcn.com/docs/components/data-table
 * @see https://tanstack.com/table/latest/docs/introduction
 */
const SimpleTable = <TData,>({
  table,
  onRowClick,
  isDataLoading,
  className,
}: Props<TData>) => {
  const columns = table.getAllColumns();
  return (
    <div
      className={cn(
        "scrollbar-hidden overflow-x-auto rounded-md border",
        className,
      )}
    >
      <Table className="w-full table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="scrollbar-hidden">
          {table.getRowModel().rows?.length && !isDataLoading ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="hover:bg-muted"
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
                onClick={() => onRowClick?.(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    <div className="w-full truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="scrollbar-hidden">
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                {isDataLoading ? (
                  <p className="mx-auto flex flex-col items-center justify-center gap-4">
                    <span>Loading...</span>
                    <Loader2Icon className={"mx-auto size-4 animate-spin"} />
                  </p>
                ) : (
                  "No results."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SimpleTable;
