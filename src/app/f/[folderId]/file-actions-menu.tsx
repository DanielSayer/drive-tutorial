"use client";

import { useMutation } from "@tanstack/react-query";
import { MoreVertical, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
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
  const { mutateAsync } = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      toast.success("File deleted successfully");
    },
  });

  return (
    <div className="flex h-9 items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open file actions menu"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open file actions menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => mutateAsync(fileId)}>
            <Trash2Icon className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
