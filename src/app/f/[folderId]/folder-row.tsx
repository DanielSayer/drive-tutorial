import { Folder as FolderIcon } from "lucide-react";
import Link from "next/link";
import type { FolderEntity } from "~/server/db/schema";

type FolderRowProps = {
  folder: FolderEntity;
};

export const FolderRow = ({ folder }: FolderRowProps) => {
  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-muted-foreground/50 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center gap-3 text-accent-foreground hover:text-primary"
          >
            <FolderIcon className="h-4 w-4" />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-muted-foreground">Folder</div>
        <div className="col-span-2 text-muted-foreground">--</div>
        <div className="col-span-1"></div>
      </div>
    </li>
  );
};
