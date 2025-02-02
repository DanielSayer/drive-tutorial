import { FileIcon } from "lucide-react";
import type { files } from "~/server/db/schema";

type FileRowProps = {
  file: typeof files.$inferSelect;
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
            className="flex items-center gap-3 text-accent-foreground hover:text-secondary"
            target="_blank"
          >
            <FileIcon className="h-4 w-4" />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-muted-foreground">File</div>
        <div className="col-span-3 text-muted-foreground">{file.size}</div>
      </div>
    </li>
  );
};
