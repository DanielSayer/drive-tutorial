"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const messages = ["Signing you in", "Fetching your drive"];

export default function Loading() {
  const [message, setMessage] = useState(messages[0]);
  const [showMessage, setShowMessage] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);

    setTimeout(() => {
      setMessage(messages[1]);
      setShowMessage(true);
    }, 1500);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span
        className={cn("opacity-0 transition-opacity duration-500", {
          "opacity-100": showMessage,
        })}
      >
        {message}
      </span>
    </div>
  );
}
