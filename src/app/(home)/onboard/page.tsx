import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FOLDER_QUERIES } from "~/server/db/folders/queries";
import { CreateDriveForm } from "./create-drive-form";
import Redirect from "./redirect";

export default async function Page() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await FOLDER_QUERIES.getRootFolder(session.userId);
  if (rootFolder?.id) {
    // For whatever reason, the redirect function is very slow and it gets stuck with nothing on the UI
    return <Redirect url={`/f/${rootFolder.id}`} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Welcome to your new drive</h1>
      <span className="tracking-tight text-muted-foreground">
        Please enter a name for your drive to get started
      </span>
      <CreateDriveForm />
    </div>
  );
}
