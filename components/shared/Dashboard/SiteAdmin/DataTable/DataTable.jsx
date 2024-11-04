"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([{ id: "date", desc: true }]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
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
                <TableHead
                  key={header.id}
                  onClick={() => {
                    // Toggle the sorting state for the specific column
                    const isCurrentlyDesc = sorting.find(
                      (sort) => sort.id === header.id && sort.desc === true
                    );

                    // Update sorting state to toggle between ascending and descending
                    setSorting([{ id: header.id, desc: !isCurrentlyDesc }]);
                  }} // Toggle sorting on click
                  className="cursor-pointer relative"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* Always display sorting icon */}
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === "asc" ? (
                      <ChevronUp className="header-4 text-black absolute  last:right-4 inset-y-3" />
                    ) : (
                      <ChevronDown className="header-4 text-black absolute  last:right-4 inset-y-3" />
                    )
                  ) : header.id === "date" ? (
                    // Show default icon for date column
                    <ChevronDown className="header-4 text-black absolute  last:right-4 inset-y-3" />
                  ) : (
                    <ChevronUp className="header-4 text-black absolute  last:right-4 inset-y-3" />
                  )}
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
