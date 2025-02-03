import { db } from "..";
import { file_table } from "../schema";

type CreateFileRequest = {
  name: string;
  size: number;
  url: string;
  parentId: number;
};

export const FILE_MUTATIONS = {
  createFile: async function (userId: string, file: CreateFileRequest) {
    return await db.insert(file_table).values({
      ...file,
      ownerId: userId,
    });
  },
};
