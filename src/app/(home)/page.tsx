import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <h1 className="mb-4 bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
        Epic Drive
      </h1>
      <p className="mx-auto mb-8 max-w-md text-xl text-muted-foreground md:text-2xl">
        Secure, fast, and easy file storage for the modern web
      </p>
      <form
        action={async () => {
          "use server";

          const session = await auth();
          if (!session.userId) {
            return redirect("/sign-in");
          }

          return redirect("/onboard");
        }}
      >
        <Button
          size="lg"
          type="submit"
          className="border border-slate-700 bg-slate-800 text-white transition-colors hover:bg-slate-700"
        >
          Get Started
        </Button>
      </form>
      <footer className="mt-16 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Epic Drive. All rights reserved.
      </footer>
    </>
  );
}
