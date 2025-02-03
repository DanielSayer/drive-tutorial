import { and, eq } from "drizzle-orm";
import { db } from "..";
import { file_table } from "../schema";

type CreateFileRequest = {
  name: string;
  size: number;
  parentId: number;
  utData: {
    key: string;
    url: string;
    type: string;
  };
};

export const FILE_MUTATIONS = {
  createFile: async function (userId: string, file: CreateFileRequest) {
    return await db.insert(file_table).values({
      name: file.name,
      size: file.size,
      parentId: file.parentId,
      url: file.utData.url,
      key: file.utData.key,
      type: file.utData.type,
      ownerId: userId,
    });
  },
  deleteFile: async function (fileId: number, userId: string) {
    return await db
      .delete(file_table)
      .where(and(eq(file_table.id, fileId), eq(file_table.ownerId, userId)));
  },
};
