import { notFound } from "next/navigation";
import { FILE_QUERIES } from "~/server/db/files/queries";
import { FOLDER_QUERIES } from "~/server/db/folders/queries";
import DriveContents from "./drive-contents";

type PageParams = {
  params: Promise<{ folderId: string }>;
};

export default async function GoogleDriveClone(props: PageParams) {
  const params = await props.params;
  const folderId = parseInt(params.folderId);

  if (isNaN(folderId)) {
    return notFound();
  }

  const filesPromise = FILE_QUERIES.getFilesInFolder(folderId);
  const foldersPromise = FOLDER_QUERIES.getFoldersInFolder(folderId);
  const parentsPromise = FOLDER_QUERIES.getAllParentsOfFolder(folderId);

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
