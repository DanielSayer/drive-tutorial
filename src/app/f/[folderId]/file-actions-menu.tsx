"use client";

import { MoreVertical, Trash2Icon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { deleteFile } from "~/server/actions";

type FileActionsMenuProps = {
  fileId: number;
};

export function FileActionsMenu({ fileId }: FileActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open file actions menu">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open file actions menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => deleteFile(fileId)}>
          <Trash2Icon className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
