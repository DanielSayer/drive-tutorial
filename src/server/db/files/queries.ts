import "server-only";

import { eq } from "drizzle-orm";
import { db } from "..";
import { file_table } from "../schema";

export const FILE_QUERIES = {
  getFilesInFolder: function (folderId: number) {
    return db
      .select()
      .from(file_table)
      .where(eq(file_table.parentId, folderId));
  },
};
