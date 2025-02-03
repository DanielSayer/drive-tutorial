"use server";

import { auth } from "@clerk/nextjs/server";
import { FILE_MUTATIONS } from "./db/files/mutations";
import { FILE_QUERIES } from "./db/files/queries";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { FOLDER_QUERIES } from "./db/folders/queries";
import { FOLDER_MUTATIONS } from "./db/folders/mutations";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();

  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const file = await FILE_QUERIES.getFile(fileId, session.userId);

  if (!file) {
    return { error: "File not found" };
  }

  await utApi.deleteFiles(file.key);
  await FILE_MUTATIONS.deleteFile(fileId, session.userId);

  const c = await cookies();

  c.set("force-refresh", JSON.stringify(Math.random()));
  return { success: true };
}

export async function onBoardUser(folderName: string) {
  const session = await auth();

  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const existingRootFolder = await FOLDER_QUERIES.getRootFolder(session.userId);

  if (existingRootFolder) {
    return { error: "User already has a root folder" };
  }

  const rootFolder = await FOLDER_MUTATIONS.createRootFolder(
    session.userId,
    folderName,
  );

  if (!rootFolder) {
    return { error: "Failed to create root folder" };
  }

  await FOLDER_MUTATIONS.createFolders([
    {
      name: "Documents",
      parentId: rootFolder.id,
      userId: session.userId,
    },
    {
      name: "Images",
      parentId: rootFolder.id,
      userId: session.userId,
    },
    {
      name: "Work",
      parentId: rootFolder.id,
      userId: session.userId,
    },
    {
      name: "Presentations",
      parentId: rootFolder.id,
      userId: session.userId,
    },
  ]);

  return { success: true, data: { rootFolderId: rootFolder.id } };
}
