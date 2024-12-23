"use client";

export const columns = [
  {
    accessorKey: "username",
    header: "Username",
    enableFiltering: true,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "action",
    header: "Action",
    enableFiltering: true,
  },
  {
    accessorKey: "date",
    header: "Date",
    enableFiltering: true,
    sortingFn: "datetime",
  },
];
