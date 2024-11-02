"use client";

export const columns = [
  {
    accessorKey: "username",
    header: "Username",
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "date",
    header: "Date",
    sortingFn: "datetime",
  },
];
