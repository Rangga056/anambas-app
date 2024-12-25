"use client";

export const columns = [
  {
    accessorKey: "username",
    header: "Username",
    enableFiltering: false,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "action",
    header: "Action",
    enableFiltering: true, // Keep this true to enable filtering
  },
  {
    accessorKey: "date",
    header: "Date",
    enableFiltering: false,
    sortingFn: "datetime",
  },
];
