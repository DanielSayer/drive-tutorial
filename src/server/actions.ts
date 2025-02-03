"use server";

import { auth } from "@clerk/nextjs/server";
import { FILE_MUTATIONS } from "./db/files/mutations";
import { FILE_QUERIES } from "./db/files/queries";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();

  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  const file = await FILE_QUERIES.getFile(fileId, session.userId);

  if (!file) {
    return { error: "File not found" };
  }

  await utApi.deleteFiles(file.key);
  await FILE_MUTATIONS.deleteFile(fileId, session.userId);

  const c = await cookies();

  c.set("force-refresh", JSON.stringify(Math.random()));
  return { success: true };
}
