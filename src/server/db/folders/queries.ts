import "server-only";

import { and, asc, eq, isNull } from "drizzle-orm";
import { db } from "..";
import { folder_table } from "../schema";

export const FOLDER_QUERIES = {
  getAllParentsOfFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(folder_table)
        .where(eq(folder_table.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0].parentId;
    }
    return parents;
  },
  getFoldersInFolder: function (folderId: number) {
    return db
      .select()
      .from(folder_table)
      .where(eq(folder_table.parentId, folderId))
      .orderBy(asc(folder_table.name));
  },
  getFolder: async function (folderId: number) {
    const folder = await db
      .select()
      .from(folder_table)
      .where(eq(folder_table.id, folderId));
    return folder[0];
  },
  getRootFolder: async function (userId: string) {
    const folder = await db
      .select()
      .from(folder_table)
      .where(
        and(eq(folder_table.ownerId, userId), isNull(folder_table.parentId)),
      );
    return folder[0];
  },
};
