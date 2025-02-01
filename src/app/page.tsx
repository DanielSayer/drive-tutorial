"use client";

import { ChevronRight, FileIcon, Folder, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { mockFiles } from "../lib/mock-data";

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const getCurrentFiles = () => {
    return mockFiles.filter((file) => file.parent === currentFolder);
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== null) {
      const folder = mockFiles.find((file) => file.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent;
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button onClick={() => setCurrentFolder(null)} variant="ghost">
              My Drive
            </Button>
            {getBreadcrumbs().map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="text-muted-foreground mx-2 h-4 w-4" />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
        <div className="bg-muted rounded-lg shadow-xl">
          <div className="border-muted-foreground border-b px-6 py-4">
            <div className="text-muted-foreground grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {getCurrentFiles().map((file) => (
              <li
                key={file.id}
                className="hover:bg-gray-750 border-muted-foreground/50 border-b px-6 py-4"
              >
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-6 flex items-center">
                    {file.type === "folder" ? (
                      <button
                        onClick={() => handleFolderClick(file.id)}
                        className="text-accent-foreground hover:text-secondary flex items-center gap-3"
                      >
                        <Folder className="h-4 w-4" />
                        {file.name}
                      </button>
                    ) : (
                      <Link
                        href={file.url ?? "#"}
                        className="hover:text-secondary text-accent-foreground flex items-center gap-3"
                      >
                        <FileIcon className="h-4 w-4" />
                        {file.name}
                      </Link>
                    )}
                  </div>
                  <div className="text-muted-foreground col-span-3">
                    {file.type === "folder" ? "Folder" : "File"}
                  </div>
                  <div className="text-muted-foreground col-span-3">
                    {file.type === "folder" ? "--" : "2 MB"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
