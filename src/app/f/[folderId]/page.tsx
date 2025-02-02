import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../driver-contents";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

type PageParams = {
  params: Promise<{ folderId: string }>;
};

export default async function GoogleDriveClone(props: PageParams) {
  const params = await props.params;
  const folderId = parseInt(params.folderId);

  if (isNaN(folderId)) {
    return notFound();
  }

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parentId, folderId));

  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parentId, folderId));

  return <DriveContents files={files} folders={folders} />;
}
