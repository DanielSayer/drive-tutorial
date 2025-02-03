import { db } from "..";
import { folder_table } from "../schema";

export const FOLDER_MUTATIONS = {
  createRootFolder: async function (userId: string, name: string) {
    const rootFolder = await db
      .insert(folder_table)
      .values({
        name: name,
        parentId: null,
        ownerId: userId,
      })
      .$returningId();

    return rootFolder[0];
  },
  createFolders: async function (
    folderRequests: {
      name: string;
      parentId: number;
      userId: string;
    }[],
  ) {
    const folders = await db
      .insert(folder_table)
      .values(
        folderRequests.map((x) => ({
          name: x.name,
          parentId: x.parentId,
          ownerId: x.userId,
        })),
      )
      .$returningId();

    return folders;
  },
};
