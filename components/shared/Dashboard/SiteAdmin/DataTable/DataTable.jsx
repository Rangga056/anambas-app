"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (column.id === "action") {
    return (
      isClient && (
        <Select
          value={columnFilterValue || "all"}
          onValueChange={(value) =>
            column.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Actions</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="add">Add</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    );
  }

  return null;
}

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([{ id: "date", desc: true }]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // Default rows per page
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    sortingFns: {
      alphanumeric: (rowA, rowB, columnId) => {
        const a = rowA.original[columnId] || "";
        const b = rowB.original[columnId] || "";
        return a.localeCompare(b);
      },
      datetime: (rowA, rowB, columnId) => {
        return (
          new Date(rowA.original[columnId]) - new Date(rowB.original[columnId])
        );
      },
    },
  });

  const goToPage = (page) => {
    const pageIndex = Math.max(0, Math.min(page - 1, table.getPageCount() - 1));
    table.setPageIndex(pageIndex);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-2 pt-3 h-full align-top"
                >
                  <div className="flex items-start flex-col gap-y-2 py-2">
                    <h3 className="md:text-lg pl-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </h3>
                    {header.column.getCanFilter() && (
                      <Filter column={header.column} />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border-x last:border-0">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <Dialog>
                  <DialogTrigger asChild className="mt-2">
                    <td className="text-gray-500 hover:text-black header-4 hover:cursor-pointer flex-center w-fit absolute right-4">
                      &#x2026;
                    </td>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      Details for {row.original.username}
                    </DialogTitle>
                    <p className="body md:paragraph-3">
                      Action: {row.original.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {row.original.date}
                    </p>
                    <DialogDescription className="body md:paragraph-3 text-black font-poppins">
                      {row.original.desc}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col items-center gap-4 p-4 md:flex-row w-full justify-end">
        <div className="flex items-center gap-2 w-full justify-center">
          <ChevronsLeft
            className={`cursor-pointer ${
              !table.getCanPreviousPage() ? "text-gray-400" : "text-black"
            }`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          />
          <ChevronLeft
            className={`cursor-pointer ${
              !table.getCanPreviousPage() ? "text-gray-400" : "text-black"
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <span>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <ChevronRight
            className={`cursor-pointer ${
              !table.getCanNextPage() ? "text-gray-400" : "text-black"
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <ChevronsRight
            className={`cursor-pointer ${
              !table.getCanNextPage() ? "text-gray-400" : "text-black"
            }`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
        </div>
        <div className="flex items-center justify-end w-max">
          <div className="flex items-center gap-2">
            <span>Go to page:</span>
            <Input
              type="number"
              min={1}
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-16">
                <SelectValue placeholder="Show rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
