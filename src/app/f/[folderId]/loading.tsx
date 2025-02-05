import { LoadingTable } from "~/components/loading-table";
import { Button } from "~/components/ui/button";

export default function Loading() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost">Your drive</Button>
        </div>
        <Button className="w-36 text-accent-foreground !opacity-100" disabled>
          Choose File(s)
        </Button>
      </div>
      <LoadingTable rowsToDisplay={5} />
    </>
  );
}
