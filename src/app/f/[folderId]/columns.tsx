"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatBytes } from "~/lib/utils";
import { FileActionsMenu } from "./file-actions-menu";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type DriveData = {
  id: number;
  name: string;
  type: string;
  size?: number;
};

function isFileRow(row: DriveData) {
  return "size" in row;
}

export const columns: ColumnDef<DriveData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex h-9 items-center">{row.getValue("name")}</div>
      );
    },
    sortingFn: "text",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const size = row.getValue<number | undefined>("size");
      if (size) {
        return <div>{formatBytes(size)}</div>;
      }
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      if (isFileRow(row.original)) {
        return (
          <div className="flex h-9 items-center justify-end">
            <FileActionsMenu fileId={row.original.id} />
          </div>
        );
      }
    },
  },
];
