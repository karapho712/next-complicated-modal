"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
// @ts-expect-error
import queryString from "query-string";
// import { table } from "console";
import React from "react";
import {
  DataTablePaginationProps,
  Pagination,
} from "../../../types";

export const getInitialPagination = (
  override: Partial<Pagination> = {}
): Pagination => ({
  page: override.page || 1,
  limit: override.limit || 10,
});

export const getDefaultParams = <T extends object>(
  defaultValues: T
) => {
  const searchParams = useSearchParams();
  const fromQuery: Record<string, any> = {};

  for (const [key, value] of searchParams.entries()) {
    fromQuery[key] = value;
  }

  const combined = {
    ...defaultValues,
    ...fromQuery,
  };

  const pagination = getInitialPagination(combined);

  return {
    ...combined,
    ...pagination,
  };
};

export type PaginationProps = {
  pagination: PaginationState;
  pageCount: number;
  setPagination: (
    // updaterOrValue: (PaginationState | ((prevState: PaginationState) => PaginationState))
    updaterOrValue
  ) => void;
};

type DataTableProps<Data> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  isLoading?: boolean;
  paginationProps?: PaginationProps;
};

export const DataTablePagination = <TData extends object>({
  table,
}: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex ml-auto items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            Rows per page
          </p>
          <Select
            value={`${
              table.getState().pagination.pageSize
            }`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                placeholder={
                  table.getState().pagination.pageSize
                }
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1}{" "}
          of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">
              Go to first page
            </span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">
              Go to previous page
            </span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const DataTable = <Data extends object>({
  data,
  columns,
  paginationProps,
  isLoading,
}: DataTableProps<Data>) => {
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    // Di bawah ini wajib di isi karna manual pagination sebagaui additional paginationprops
    manualPagination: true,
    pageCount: paginationProps?.pageCount,
    state: {
      pagination: paginationProps?.pagination,
    },
    onPaginationChange: paginationProps
      ? (newState) => {
          // di passing di sini dari PaginationProps or hook usePaginationProps
          paginationProps.setPagination(
            newState as PaginationState
          );
        }
      : undefined,
  });

  return (
    <div className="w-full p-4">
      <div className="rounded-md border mb-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <div>
                <TableRow>
                  <TableCell colSpan={100}>
                    <Skeleton className="h-4 w-[200px]" />
                  </TableCell>
                </TableRow>
              </div>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={
                        row.getIsSelected() && "selected"
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationProps && (
        <DataTablePagination table={table} />
      )}
    </div>
  );
};
