import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import type { file_table, folder_table } from "~/server/db/schema";
import { FileRow } from "./file-row";
import { FolderRow } from "./folder-row";

const ROOT_FOLDER_ID = 1;

type DriveContentsProps = {
  files: (typeof file_table.$inferSelect)[];
  folders: (typeof folder_table.$inferSelect)[];
  parents: (typeof folder_table.$inferSelect)[];
};

export default function DriveContents({
  files,
  folders,
  parents,
}: DriveContentsProps) {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={`/f/${ROOT_FOLDER_ID}`}
              className={buttonVariants({ variant: "ghost" })}
            >
              My Drive
            </Link>
            {parents.map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
                <Link
                  href={`/f/${folder.id}`}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="rounded-lg bg-muted shadow-xl">
          <div className="border-b border-muted-foreground px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
