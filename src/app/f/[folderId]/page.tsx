import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../driver-contents";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;

  while (currentId !== null) {
    const folders = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    const folder = folders[0];
    if (!folder) {
      throw new Error(`Parent folder not found, id: ${currentId}`);
    }

    parents.unshift(folder);
    currentId = folder.parentId;
  }

  return parents;
}

type PageParams = {
  params: Promise<{ folderId: string }>;
};

export default async function GoogleDriveClone(props: PageParams) {
  const params = await props.params;
  const folderId = parseInt(params.folderId);

  if (isNaN(folderId)) {
    return notFound();
  }

  const filesPromise = db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parentId, folderId));

  const foldersPromise = db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parentId, folderId));

  const parentsPromise = getAllParents(folderId);

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
