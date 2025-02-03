import { FileIcon } from "lucide-react";
import type { FileEntity } from "~/server/db/schema";
import { FileActionsMenu } from "./file-actions-menu";

type FileRowProps = {
  file: FileEntity;
};

export const FileRow = ({ file }: FileRowProps) => {
  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-muted-foreground/50 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url}
            className="flex items-center gap-3 text-accent-foreground hover:text-primary"
            target="_blank"
          >
            <FileIcon className="h-4 w-4" />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-muted-foreground">{file.type}</div>
        <div className="col-span-2 text-muted-foreground">{file.size}</div>
        <div className="col-span-1 flex items-center justify-end">
          <FileActionsMenu fileId={file.id} />
        </div>
      </div>
    </li>
  );
};
