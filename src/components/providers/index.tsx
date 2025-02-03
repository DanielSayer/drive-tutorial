import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./post-hog";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider>
      <PostHogProvider>{children}</PostHogProvider>
    </ClerkProvider>
  );
};
