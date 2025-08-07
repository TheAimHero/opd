"use client";

import {
  flexRender,
  type Row,
  type Table as TableType,
} from "@tanstack/react-table";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  onFilterChange?: (value: string) => void | Promise<void>;
  onSelectedRowChange?: (rows: Row<TData>[]) => void | Promise<void>;
  isDataLoading?: boolean;
  className?: string;
}

/**
 * This is a simple table built with snadcn/ui and tanstack/react-table.
 *
 * @param table - The table instance created by useReactTable
 * @param onRowClick - The event handler for when a row is clicked
 * @param onFilterChange - The event handler for when the search input changes
 * @param selectedRows - The event handler called when the selected rows change
 * @param className - The className to be applied to the surrounding div
 * @param isDataLoading - The loading state of the data
 *
 * @see https://ui.shadcn.com/docs/components/table
 * @see https://ui.shadcn.com/docs/components/data-table
 * @see https://tanstack.com/table/latest/docs/introduction
 */
const StatefulTable = <TData,>({
  table,
  onRowClick,
  onFilterChange,
  onSelectedRowChange,
  isDataLoading,
  className,
}: Props<TData>) => {
  const columns = table.getAllColumns();

  const rowSelection = table.getState().rowSelection;

  useEffect(() => {
    const selectedTableRows = Object.keys(rowSelection).map((v) =>
      table.getRow(v),
    );
    onSelectedRowChange?.(selectedTableRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, onSelectedRowChange, table.getRow]);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-md border py-[40px]",
        className,
      )}
    >
      <div className="absolute top-0 flex h-[40px] w-full items-center gap-2 bg-secondary px-4">
        <Input
          className="h-[32px] max-w-[30%] bg-background dark:bg-input/30"
          onChange={(e) => {
            table.setGlobalFilter(String(e.target.value));
            onFilterChange?.(e.target.value);
          }}
          placeholder="Search..."
          value={table.getState().globalFilter ?? ""}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              Columns <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    checked={column.getIsVisible()}
                    className="capitalize"
                    key={column.id}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
        <TableBody>
          {table.getRowModel().rows?.length && !isDataLoading ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="hover:bg-muted/50"
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
            <TableRow>
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
      {
        <div className="absolute bottom-0 flex h-[40px] w-full items-center justify-between gap-2 border-t bg-secondary px-4">
          <span className="w-full text-balance">
            Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
            {table.getRowCount()} Rows
          </span>
          <span className="w-full text-balance">
            Showing {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1} Pages
          </span>
          <div className="flex flex-row gap-2">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size="sm"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size="sm"
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      }
    </div>
  );
};

export default StatefulTable;
