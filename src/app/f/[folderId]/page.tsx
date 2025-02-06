import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { FILE_QUERIES } from "~/server/db/files/queries";
import { FOLDER_QUERIES } from "~/server/db/folders/queries";
import DriveContents from "./drive-contents";

type PageParams = {
  params: Promise<{ folderId: string }>;
};

export default async function GoogleDriveClone(props: PageParams) {
  const user = await auth();
  if (!user.userId) {
    redirect("/sign-in");
  }

  const params = await props.params;
  const folderId = parseInt(params.folderId);

  if (isNaN(folderId)) {
    return notFound();
  }

  const filesPromise = FILE_QUERIES.getFilesInFolder(folderId, user.userId);
  const foldersPromise = FOLDER_QUERIES.getFoldersInFolder(
    folderId,
    user.userId,
  );
  const parentsPromise = FOLDER_QUERIES.getAllParentsOfFolder(
    folderId,
    user.userId,
  );

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={folderId}
    />
  );
}
