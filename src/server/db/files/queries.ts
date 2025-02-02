import { eq } from "drizzle-orm";
import { db } from "..";
import { file_table } from "../schema";

export function getFilesInFolder(folderId: number) {
  return db.select().from(file_table).where(eq(file_table.parentId, folderId));
}
