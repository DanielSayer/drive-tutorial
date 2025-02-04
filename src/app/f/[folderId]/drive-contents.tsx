"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { UploadButton } from "~/components/uploadthing";
import type { FileEntity, FolderEntity } from "~/server/db/schema";
import { columns } from "./columns";

type DriveContentsProps = {
  files: FileEntity[];
  folders: FolderEntity[];
  parents: FolderEntity[];
  currentFolderId: number;
};

export default function DriveContents({
  files,
  folders,
  parents,
  currentFolderId,
}: DriveContentsProps) {
  const navigate = useRouter();

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/`} className={buttonVariants({ variant: "ghost" })}>
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
        <DataTable
          columns={columns}
          data={[
            ...folders.map((folder) => ({
              id: folder.id,
              name: folder.name,
              type: "Folder",
            })),
            ...files.map((file) => ({
              id: file.id,
              name: file.name,
              type: file.type,
              size: file.size,
            })),
          ]}
        />
        <UploadButton
          endpoint="driveUploader"
          input={{ folderId: currentFolderId }}
          onClientUploadComplete={() => {
            navigate.refresh();
          }}
        />
      </div>
    </div>
  );
}
