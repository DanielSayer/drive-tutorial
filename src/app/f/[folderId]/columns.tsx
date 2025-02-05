"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatBytes } from "~/lib/utils";
import { FileActionsMenu } from "./file-actions-menu";
import { Button } from "~/components/ui/button";
import { ArrowUpDown, FileIcon, FolderIcon } from "lucide-react";
import Link from "next/link";

type DriveFile = {
  id: number;
  name: string;
  type: string;
  fileData: {
    url: string;
    size: number;
  };
};

type DriveFolder = {
  id: number;
  name: string;
  type: string;
};
type DriveData = DriveFile | DriveFolder;

function isFileRow(row: DriveData): row is DriveFile {
  return "fileData" in row;
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
      const originalRow = row.original;
      return (
        <div className="flex h-9 items-center">
          {isFileRow(originalRow) ? (
            <FileTitleCell
              url={originalRow.fileData.url}
              name={originalRow.name}
            />
          ) : (
            <FolderTitleCell id={originalRow.id} name={originalRow.name} />
          )}
        </div>
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
      const originalRow = row.original;
      if (isFileRow(originalRow)) {
        return <div>{formatBytes(originalRow.fileData.size)}</div>;
      }
    },
    sortingFn: (row1, row2) => {
      const originalRow1 = row1.original;
      const originalRow2 = row2.original;

      if (isFileRow(originalRow1) && isFileRow(originalRow2)) {
        return originalRow1.fileData.size - originalRow2.fileData.size;
      }
      return -1;
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      if (isFileRow(row.original)) {
        return <FileActionsMenu fileId={row.original.id} />;
      }
    },
  },
];

const FolderTitleCell = (props: { id: number; name: string }) => {
  return (
    <Link
      href={`/f/${props.id}`}
      className="flex items-center gap-3 text-accent-foreground hover:text-primary"
    >
      <FolderIcon className="h-4 w-4" />
      {props.name}
    </Link>
  );
};

const FileTitleCell = (props: { url: string; name: string }) => {
  return (
    <a
      href={props.url}
      className="flex items-center gap-3 text-accent-foreground hover:text-primary"
      target="_blank"
    >
      <FileIcon className="h-4 w-4" />
      {props.name}
    </a>
  );
};
