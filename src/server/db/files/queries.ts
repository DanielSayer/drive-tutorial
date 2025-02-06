import "server-only";

import { eq, asc, and } from "drizzle-orm";
import { db } from "..";
import { file_table } from "../schema";

export const FILE_QUERIES = {
  getFilesInFolder: function (folderId: number, userId: string) {
    return db
      .select()
      .from(file_table)
      .where(
        and(eq(file_table.parentId, folderId), eq(file_table.ownerId, userId)),
      )
      .orderBy(asc(file_table.name));
  },
  getFile: async function (fileId: number, userId: string) {
    const file = await db
      .select()
      .from(file_table)
      .where(and(eq(file_table.id, fileId), eq(file_table.ownerId, userId)));

    return file[0];
  },
};
