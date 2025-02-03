import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FOLDER_QUERIES } from "~/server/db/folders/queries";

export default async function Page() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await FOLDER_QUERIES.getRootFolder(session.userId);
  if (!rootFolder) {
    return redirect("/fake-drive");
  }
  return redirect(`/f/${rootFolder.id}`);
}
