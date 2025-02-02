import { notFound } from "next/navigation";
import { getFilesInFolder } from "~/server/db/files/queries";
import {
  getAllParentsOfFolder,
  getFoldersInFolder,
} from "~/server/db/folders/queries";
import DriveContents from "../../driver-contents";

type PageParams = {
  params: Promise<{ folderId: string }>;
};

export default async function GoogleDriveClone(props: PageParams) {
  const params = await props.params;
  const folderId = parseInt(params.folderId);

  if (isNaN(folderId)) {
    return notFound();
  }

  const filesPromise = getFilesInFolder(folderId);
  const foldersPromise = getFoldersInFolder(folderId);
  const parentsPromise = getAllParentsOfFolder(folderId);

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
