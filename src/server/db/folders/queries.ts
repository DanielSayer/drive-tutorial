import "server-only";

import { db } from "..";
import { folder_table } from "../schema";
import { eq } from "drizzle-orm";

export const FOLDER_QUERIES = {
  getAllParentsOfFolder: function (folderId: number) {
    return db
      .select()
      .from(folder_table)
      .where(eq(folder_table.parentId, folderId));
  },
  getFoldersInFolder: function (folderId: number) {
    return db
      .select()
      .from(folder_table)
      .where(eq(folder_table.parentId, folderId));
  },
};
