import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { PostHogProvider } from "./post-hog";
import { ReactQueryProvider } from "./react-query";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <PostHogProvider>
          {children}
          <Toaster richColors />
        </PostHogProvider>
      </ReactQueryProvider>
    </ClerkProvider>
  );
};
