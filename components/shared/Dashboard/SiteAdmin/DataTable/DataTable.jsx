"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";

function Filter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Input
        value={columnFilterValue ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder="Search..."
        className="w-full border rounded p-1"
      />
    )
  );
}

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([{ id: "date", desc: true }]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enable sorting functionality
    sortingFns: {
      // Custom sorting functions if needed
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
  console.log(table);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-2">
                  <div className="flex items-start flex-col gap-y-2 py-2">
                    {/* Render column header */}
                    <h3 className="md:text-lg pl-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </h3>
                    <div className="flex items-center justify-between w-full">
                      {/* Filter input */}
                      {typeof window !== "undefined" &&
                        header.column.getCanFilter() && (
                          <Filter column={header.column} />
                        )}
                      {/* Sorting icon */}
                      <div
                        onClick={() => {
                          // Toggle the sorting state for the specific column
                          const isCurrentlyDesc = sorting.find(
                            (sort) =>
                              sort.id === header.id && sort.desc === true
                          );

                          // Update sorting state to toggle between ascending and descending
                          setSorting([
                            { id: header.id, desc: !isCurrentlyDesc },
                          ]);
                        }} // Toggle sorting on click
                        className="cursor-pointer"
                      >
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "asc" ? (
                            <ChevronUp className="header-4 text-black ml-2" />
                          ) : (
                            <ChevronDown className="header-4 text-black ml-2" />
                          )
                        ) : header.id === "date" ? (
                          // Default sorting icon for date column
                          <ChevronDown className="header-4 text-black ml-2" />
                        ) : (
                          <ChevronUp className="header-4 text-black ml-2" />
                        )}
                      </div>
                    </div>
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
                  <TableCell
                    key={cell.id}
                    className="border-x last:border-0  [&:nth-child(3)]:border-0 last:relative"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <Dialog>
                  <DialogTrigger asChild className="mt-2">
                    <td className="text-gray-500 hover:text-black header-4 hover:cursor-pointer flex-center w-fit absolute right-4">
                      &#x2026; {/* Ellipsis character */}
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
    </div>
  );
}
