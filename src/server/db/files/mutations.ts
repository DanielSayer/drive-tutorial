import { db } from "..";
import { file_table } from "../schema";

type CreateFileRequest = {
  name: string;
  size: number;
  url: string;
};

export const FILE_MUTATIONS = {
  createFile: async function (userId: string, file: CreateFileRequest) {
    return await db.insert(file_table).values({
      ...file,
      parentId: 1,
    });
  },
};
