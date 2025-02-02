import { db } from "..";
import { folder_table } from "../schema";
import { eq } from "drizzle-orm";

export function getFoldersInFolder(folderId: number) {
  return db
    .select()
    .from(folder_table)
    .where(eq(folder_table.parentId, folderId));
}

export async function getAllParentsOfFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;

  while (currentId !== null) {
    const folders = await db
      .select()
      .from(folder_table)
      .where(eq(folder_table.id, currentId));

    const folder = folders[0];
    if (!folder) {
      throw new Error(`Parent folder not found, id: ${currentId}`);
    }

    parents.unshift(folder);
    currentId = folder.parentId;
  }

  return parents;
}
