"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RedirectProps = {
  url: string;
};

export default function Redirect({ url }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(url);
  }, [router, url]);

  return (
    <div className="flex items-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span>Sending you there now...</span>
    </div>
  );
}
